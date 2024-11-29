package service_test

import (
	"athenabase/internal/service"
	"fmt"
	"testing"
)

func TestMakeAndVerifyPassword(t *testing.T) {
	password := "securePassword123"

	cipher := service.Auth.MakePassWord(password)

	fmt.Println(cipher)

	err := service.Auth.VerifyPassword(cipher, password)
	if err != nil {
		t.Errorf("expected nil, but got error: %v", err)
	}

	invalidPassword := "wrongPassword"
	err = service.Auth.VerifyPassword(cipher, invalidPassword)
	if err == nil {
		t.Errorf("expected error, but got nil")
	}
}
