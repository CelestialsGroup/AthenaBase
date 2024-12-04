package model

import (
	"time"
)

type Model struct {
	ID int64 `bun:"id,pk,autoincrement"`

	CreatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp"`
	UpdatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp"`
	DeletedAt time.Time `bun:",soft_delete,nullzero"`
}

type ModeIdx struct {
	Name    string
	Unique  bool
	Columns []string
}
