package migrate

import (
	"athenabase/helper"
	"athenabase/internal"
	"athenabase/internal/model"
	"athenabase/logger"
	"context"
	"encoding/json"
	"sort"
	"sync"

	"golang.org/x/mod/semver"
)

type MigrateState struct {
	State   string `json:"state"`
	Message string `json:"message"`
}

var migrateState = &MigrateState{
	State: "checking",
}

func GetMigrateState() MigrateState {
	return *migrateState
}

type MigrateDeal struct {
	Version string
	Func    func(ctx context.Context) error
}

var migrateDeal = []MigrateDeal{}
var migrateLock = &sync.Mutex{}

func Migrate() {
	migrateLock.Lock()
	defer migrateLock.Unlock()

	ctx := context.Background()
	versionSetting := new(model.Setting)
	err := internal.MasterDB().NewSelect().Model(versionSetting).Where("key = ?", "version").Scan(ctx)
	version := "0.0.0"
	if err == nil {
		json.Unmarshal(versionSetting.Value, &version)
	}
	if version == internal.Version {
		migrateState.State = "success"
		migrateState.Message = "migrate done"
		return
	}
	logger.Infof("current version: %s, upgrade to %s\n", version, internal.Version)
	sort.Slice(migrateDeal, func(i, j int) bool {
		return semver.Compare(migrateDeal[i].Version, migrateDeal[j].Version) == -1
	})

	for _, deal := range migrateDeal {
		if version != "0.0.0" && semver.Compare(deal.Version, version) != 1 {
			continue
		}
		logger.Infof("exec %s deal...\n", deal.Version)
		err := deal.Func(ctx)
		if err == nil {
			continue
		}
		logger.Errorf("exec %s deal error %s\n", deal.Version, err.Error())
		migrateState.State = "error"
		migrateState.Message = err.Error()
		return
	}
	migrateState.State = "success"
	migrateState.Message = "migrate done"

	internal.MasterDB().NewDelete().Model((*model.Setting)(nil)).Where("key = ?", "version").ForceDelete().Exec(ctx)
	setting := &model.Setting{Key: "version", Value: helper.StringToByteSlice(`"` + internal.Version + `"`)}
	internal.MasterDB().NewInsert().Model(setting).Exec(ctx)
}
