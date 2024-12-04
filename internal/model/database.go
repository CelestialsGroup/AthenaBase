package model

import (
	"github.com/uptrace/bun"
)

type DataBase struct {
	bun.BaseModel `bun:"table:database,alias:db"`
	Model

	Engine   string `bun:"engine,notnull" sql:"type:varchar(64)"`
	Name     string `bun:"name,notnull" sql:"type:varchar(256)"`
	Host     string `bun:"host,notnull" sql:"type:varchar(256)"`
	Port     int    `bun:"port,notnull" sql:"type:int"`
	DB       string `bun:"db,notnull" sql:"type:varchar(256)"`
	UserName string `bun:"username,notnull" sql:"type:varchar(256)"`
	PassWord string `bun:"password,notnull" sql:"type:varchar(256)"`
	Config   string `bun:"config,notnull" sql:"type:varchar(512)"`
}

var DataBaseIdx = []ModeIdx{
	{Name: "idx_host_port_unique", Unique: true, Columns: []string{"host", "port"}},
}
