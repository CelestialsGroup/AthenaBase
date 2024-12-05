package migrate

import (
	"athenabase/internal/model"
	"context"
)

func init() {
	migrateFunc["init"] = func(ctx context.Context) {
		model.MasterDB().NewCreateTable().Model((*model.AuthUser)(nil)).Exec(ctx)
		model.MasterDB().NewCreateTable().Model((*model.AuthSession)(nil)).Exec(ctx)
		model.MasterDB().NewCreateTable().Model((*model.DataBase)(nil)).Exec(ctx)
		for _, idx := range model.DataBaseIdx {
			stmt := model.MasterDB().NewCreateIndex().Model((*model.DataBase)(nil)).
				Index(idx.Name).Column(idx.Columns...)
			if idx.Unique {
				stmt = stmt.Unique()
			}
			stmt.Exec(ctx)
		}
		model.MasterDB().NewCreateTable().Model((*model.Setting)(nil)).Exec(ctx)
	}
}
