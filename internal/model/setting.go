package model

import (
	"encoding/json"

	"github.com/uptrace/bun"
)

type Setting struct {
	bun.BaseModel `bun:"table:setting,alias:setting"`
	Model

	Key   string          `bun:"key,notnull,unique" sql:"type:varchar(64)"`
	Value json.RawMessage `bun:"value" sql:"type:json"`
}
