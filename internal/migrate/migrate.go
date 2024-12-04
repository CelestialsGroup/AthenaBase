package migrate

import (
	"athenabase/internal"
	"athenabase/internal/model"
	"context"
	"encoding/json"
)

type MigrateState struct {
	State   string `json:"state"`
	Message string `json:"message"`
}

var migrateState = MigrateState{
	State: "checking",
}

func GetMigrateState() MigrateState {
	return migrateState
}

var migrateFunc = map[string]func(ctx context.Context){}

func Migrate() {
	ctx := context.Background()

	tables, err := model.MasterDB().GetTables(ctx)
	if err != nil {
		migrateState.State = "error"
		migrateState.Message = err.Error()
		return
	}

	if len(tables) == 0 {
		migrateFunc["init"](ctx)
	} else {
		// localVersion from setting version -> const.version migrate
	}

	exists, err := model.MasterDB().NewSelect().Model((*model.Setting)(nil)).
		Where("key = ?", "version").Exists(ctx)
	if err != nil {
		migrateState.State = "error"
		migrateState.Message = err.Error()
		return
	}
	versionValue := json.RawMessage(internal.Version)
	if !exists {
		_, err = model.MasterDB().NewInsert().
			Model(&model.Setting{Key: "version", Value: versionValue}).
			Exec(ctx)
	} else {
		_, err = model.MasterDB().NewUpdate().Model((*model.Setting)(nil)).
			Set("value = ?", versionValue).Where("key = ?", "version").
			Exec(context.Background())
	}
	if err != nil {
		migrateState.State = "error"
		migrateState.Message = err.Error()
	} else {
		migrateState.State = "done"
		migrateState.Message = "done"
	}
}
