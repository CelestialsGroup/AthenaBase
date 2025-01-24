package model

import (
	"time"
)

type Model struct {
	ID int64 `bun:"id,pk,autoincrement" json:"id"`

	CreatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp" json:"created_at"`
	UpdatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp" json:"updated_at"`
	DeletedAt time.Time `bun:",soft_delete,nullzero" json:"-"`
}

var DataBaseModel = []any{}
