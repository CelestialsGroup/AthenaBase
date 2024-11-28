package model

import (
	"time"

	"github.com/uptrace/bun"
)

type AuthUser struct {
	bun.BaseModel `bun:"table:auth_user,alias:au"`

	ID       int64  `bun:"id,pk,autoincrement"`
	Name     string `bun:"name,notnull" sql:"type:varchar(256)"`
	Email    string `bun:"email,notnull" sql:"type:varchar(256)"`
	PassWord string `bun:"password,notnull" sql:"type:varchar(256)"`

	CreatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp"`
	UpdatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp"`
	DeletedAt time.Time `bun:",soft_delete,nullzero"`
}
