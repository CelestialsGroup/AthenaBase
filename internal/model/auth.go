package model

import (
	"encoding/json"
	"time"

	"github.com/uptrace/bun"
)

type AuthUser struct {
	bun.BaseModel `bun:"table:auth_user,alias:au"`
	Model

	Name     string `bun:"name,notnull" sql:"type:varchar(256)" json:"name"`
	Email    string `bun:"email,notnull,unique" sql:"type:varchar(256)" json:"email"`
	PassWord string `bun:"password,notnull" sql:"type:varchar(256)" json:"-"`

	IsSuperUser bool `bun:"is_superuser,notnull,default:false" json:"is_superuser"`
}

type AuthSession struct {
	bun.BaseModel `bun:"table:auth_session,alias:au"`

	ID string `bun:"id,pk" sql:"type:varchar(64)" json:"id"`

	AuthUserID int64           `bun:"auth_user_id,notnull" sql:"type:varchar(256)"`
	Data       json.RawMessage `bun:"data"`

	CreatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp" json:"created_at"`
	UpdatedAt time.Time `bun:",nullzero,notnull,default:current_timestamp" json:"updated_at"`
}
