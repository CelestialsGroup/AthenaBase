package internal

import (
	"athenabase/config"
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

const (
	Postgres = "postgres"
	SQLite   = "sqlite"
)

type DB struct {
	*bun.DB

	Engine string
}

var masterOnceDB sync.Once
var masterDB = &DB{}

func MasterDB() *DB {
	if masterDB.DB != nil {
		return masterDB
	}

	masterOnceDB.Do(func() {
		dbc := config.GetDataBaseConfig()
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
		case SQLite:
			sqldb, err := sql.Open(sqliteshim.ShimName, dbc.DSN())
			if err != nil {
				panic(err)
			}
			masterDB.DB = bun.NewDB(sqldb, sqlitedialect.New())
		default:
			panic(SystemError(fmt.Errorf("database type is not supported (%s)", dbc.Type)))
		}
	})
	return masterDB
}
