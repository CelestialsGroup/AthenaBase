package model

import (
	"context"

	"github.com/uptrace/bun"
)

type DB struct {
	*bun.DB

	Engine string
}

func (db *DB) GetTables(ctx context.Context) ([]string, error) {
	sql := "select name from sqlite_master sm where sm.`type` = 'table' and sm.name not like 'sqlite_%'" // sqlite

	if db.Engine == Postgres {
		sql = "select table_name from information_schema.tables where table_type = 'BASE TABLE' and table_schema = 'public'"
	}

	var tables []string
	err := db.NewRaw(sql).Scan(ctx, &tables)
	if err != nil {
		return nil, err
	}
	return tables, nil
}
