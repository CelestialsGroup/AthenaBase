package model

import (
	"athenabase/config"
	"athenabase/internal"
	"database/sql"
	"fmt"
	"sync"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/dialect/sqlitedialect"
	"github.com/uptrace/bun/driver/sqliteshim"
)

var masterDB = &DB{}

const (
	Postgres = "postgres"
	SQLite   = "sqlite"
)

func AllowDataBaseTypes() []string {
	return []string{Postgres, SQLite}
}

var once sync.Once

func MasterDB() *DB {
	if masterDB.DB != nil {
		return masterDB
	}

	once.Do(func() {
		dbc := config.GetDataBaseConfig()
		adbts := AllowDataBaseTypes()
		if !internal.Contains(adbts, dbc.Type) {
			panic(internal.SystemError(fmt.Errorf("database type is not supported (%s)", dbc.Type)))
		}

		masterDB.Engine = dbc.Type
		switch dbc.Type {
		case Postgres:
			config, err := pgx.ParseConfig(dbc.DSN())
			if err != nil {
				panic(err)
			}
			config.DefaultQueryExecMode = pgx.QueryExecModeSimpleProtocol
			sqldb := stdlib.OpenDB(*config)
			masterDB.DB = bun.NewDB(sqldb, pgdialect.New())
		default:
			sqldb, err := sql.Open(sqliteshim.ShimName, dbc.DSN())
			if err != nil {
				panic(err)
			}
			masterDB.DB = bun.NewDB(sqldb, sqlitedialect.New())
		}
	})
	return masterDB
}
