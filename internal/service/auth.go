package service

import (
	"athenabase/internal"
	"encoding/hex"
	"errors"
	"strings"

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

var Auth = auth{}
