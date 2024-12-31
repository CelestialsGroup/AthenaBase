package model

import (
	"fmt"

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

func (db *DataBase) DriverName() string {
	switch db.Engine {
	case "postgres":
		return "pgx"
	case "mysql":
		return "mysql"
	default:
		return "---"
	}
}

func (db *DataBase) DSN() string {
	return fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?%s", db.UserName, db.PassWord, db.Host, db.Port, db.DB, db.Config)
}

// TableSQL
//
// sql result: table_name, table_comment, column_name, data_type, column_comment
func (db *DataBase) TableSQL() string {
	return `
		select 
			t.table_name, t.table_comment, c.column_name, c.data_type, c.column_comment
		from information_schema.tables t
		join information_schema.columns c on t.table_name = c.table_name and t.table_schema = c.table_schema
		where t.table_schema = database();
	`
}

var DataBaseIdx = []ModeIdx{
	{Name: "idx_host_port_unique", Unique: true, Columns: []string{"host", "port"}},
}
