package model

import (
	"github.com/uptrace/bun"
)

type DataBase struct {
	bun.BaseModel `bun:"table:database,alias:db"`
	Model

	Engine   string `bun:"engine,notnull" sql:"type:varchar(64)" json:"engine"`
	Name     string `bun:"name,notnull" sql:"type:varchar(256)" json:"name"`
	Host     string `bun:"host,notnull" sql:"type:varchar(256)" json:"host"`
	Port     int    `bun:"port,notnull" sql:"type:int" json:"port"`
	DB       string `bun:"db,notnull" sql:"type:varchar(256)" json:"db"`
	UserName string `bun:"username,notnull" sql:"type:varchar(256)" json:"username"`
	PassWord string `bun:"password,notnull" sql:"type:varchar(256)" json:"password"`
	Config   string `bun:"config,notnull" sql:"type:varchar(512)" json:"config"`
}

var DataBaseIdx = []ModeIdx{
	{Name: "idx_host_port_unique", Unique: true, Columns: []string{"host", "port"}},
}
