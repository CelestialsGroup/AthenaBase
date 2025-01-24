package migrate

import (
	"athenabase/internal"
	"athenabase/internal/model"
	"context"
)

func init() {
	migrateDeal = append(migrateDeal, MigrateDeal{
		Version: "0.0.0",
		Func:    v000,
	})
}

func v000(ctx context.Context) error {
	for _, dbm := range model.DataBaseModel {
		_, err := internal.MasterDB().NewCreateTable().Model(dbm).Exec(ctx)
		if err != nil {
			return err
		}
	}
	return nil
}
