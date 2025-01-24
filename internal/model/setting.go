package model

import (
	"encoding/json"

	"github.com/uptrace/bun"
)

func init() {
	DataBaseModel = append(DataBaseModel, (*Setting)(nil))
}

type Setting struct {
	Model

	Key   string          `bun:"key,type:varchar(64),notnull,unique"`
	Value json.RawMessage `bun:"value,type:json"`

	bun.BaseModel `bun:"table:setting,alias:setting"`
}
