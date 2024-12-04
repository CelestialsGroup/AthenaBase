package model

import (
	"github.com/uptrace/bun"
)

type AuthUser struct {
	bun.BaseModel `bun:"table:auth_user,alias:au"`
	Model

	Name     string `bun:"name,notnull" sql:"type:varchar(256)"`
	Email    string `bun:"email,notnull,unique" sql:"type:varchar(256)"`
	PassWord string `bun:"password,notnull" sql:"type:varchar(256)"`
}
