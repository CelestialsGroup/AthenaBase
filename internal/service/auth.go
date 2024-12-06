package service

import (
	"athenabase/internal"
	"athenabase/internal/model"
	"context"
	"database/sql"
	"encoding/hex"
	"errors"
	"strings"

	"github.com/google/uuid"
	"golang.org/x/crypto/argon2"
)

type auth struct{}

func (auth) MakePassWord(password string) string {
	salt := internal.StringToByteSlice(internal.RandomString(32))
	cipher := argon2.IDKey([]byte(password), salt, 1, 64*1024, 4, 32)
	return hex.EncodeToString(cipher) + ":" + hex.EncodeToString(salt)
}

func (auth) VerifyPassword(cipher, password string) error {
	parts := strings.Split(cipher, ":")
	if len(parts) != 2 {
		return errors.New("invalid ciphertext format")
	}

	hash, salt := parts[0], parts[1]
	saltBytes, err := hex.DecodeString(salt)
	if err != nil {
		return errors.New("invalid salt format")
	}

	cipherBytes := argon2.IDKey([]byte(password), saltBytes, 1, 64*1024, 4, 32)
	if hex.EncodeToString(cipherBytes) != hash {
		return errors.New("invalid password")
	}

	return nil
}

func (auth auth) ChechAuthUser(ctx context.Context, email string, password string) (*model.AuthUser, error) {
	authUser := new(model.AuthUser)
	err := model.MasterDB().NewSelect().Model(authUser).Where("email = ?", email).Scan(ctx)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, internal.AuthUserNotFoundError
		}
		return nil, err
	}
	err = auth.VerifyPassword(authUser.PassWord, password)
	if err != nil {
		return nil, err
	}
	return authUser, nil
}

func (auth) GetUser(ctx context.Context, authUserID int64) (*model.AuthUser, error) {
	authUser := new(model.AuthUser)
	err := model.MasterDB().NewSelect().Model(authUser).Where("id = ?", authUserID).Scan(ctx)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, internal.AuthUserNotFoundError
		}
		return nil, err
	}
	return authUser, nil
}

func (auth) CreateSession(ctx context.Context, authUser *model.AuthUser) (*model.AuthSession, error) {
	uid, err := uuid.NewV7()
	if err != nil {
		return nil, err
	}
	session := &model.AuthSession{
		ID:         uid.String(),
		AuthUserID: authUser.ID,
	}
	_, err = model.MasterDB().NewInsert().Model(session).Exec(ctx)
	if err != nil {
		return nil, err
	}
	return session, nil
}

func (auth) GetSession(ctx context.Context, authSessionID string) (*model.AuthSession, error) {
	session := new(model.AuthSession)
	err := model.MasterDB().NewSelect().Model(session).Where("id = ?", authSessionID).Scan(ctx)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, internal.AuthSessionNotFoundError
		}
		return nil, err
	}
	return session, nil
}

var Auth = auth{}
