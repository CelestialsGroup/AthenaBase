package model

import (
	"encoding/json"
	"time"

	"github.com/uptrace/bun"
)

func init() {
	DataBaseModel = append(DataBaseModel, (*AuthUser)(nil), (*AuthSession)(nil))
}

type AuthUser struct {
	Model

	UserName    string `bun:"username,type:varchar(256),notnull" json:"username"`
	Email       string `bun:"email,type:varchar(256),notnull,unique" json:"email"`
	PassWord    string `bun:"password,type:varchar(256),notnull" json:"-"`
	IsSuperUser bool   `bun:"is_superuser,notnull,default:false" json:"is_superuser"`

	bun.BaseModel `bun:"table:auth_user,alias:au"`
}

type AuthSession struct {
	ID         string          `bun:"id,type:varchar(64),pk" json:"id"`
	AuthUserID int64           `bun:"auth_user_id,type:varchar(256),notnull" json:"auth_user_id"`
	Data       json.RawMessage `bun:"data,type:json" json:"data"`
	CreatedAt  time.Time       `bun:",nullzero,notnull,default:current_timestamp" json:"created_at"`
	UpdatedAt  time.Time       `bun:",nullzero,notnull,default:current_timestamp" json:"updated_at"`

	bun.BaseModel `bun:"table:auth_session,alias:au"`
}
