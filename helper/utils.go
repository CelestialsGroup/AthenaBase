package helper

import (
	"crypto/rand"
	"math/big"
	"strings"
	"unsafe"
)

const (
	AsciiLowercase = "abcdefghijklmnopqrstuvwxyz"
	AsciiUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	AsciiLetters   = AsciiLowercase + AsciiUppercase
	Digits         = "0123456789"
)

func Contains[T comparable](s []T, elem T) bool {
	if s == nil {
		return false
	}
	for _, a := range s {
		if a == elem {
			return true
		}
	}
	return false
}

func ByteSliceToString(b []byte) string {
	if len(b) == 0 {
		return ""
	}
	return unsafe.String(&b[0], len(b))
}

func StringToByteSlice(s string) []byte {
	if s == "" {
		return []byte{}
	}
	return unsafe.Slice(unsafe.StringData(s), len(s))
}

func RandomString(length int) string {
	const charset = AsciiLetters + Digits

	var builder strings.Builder
	builder.Grow(length)

	for i := 0; i < length; i++ {
		num, err := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		if err != nil {
			panic(err)
		}
		builder.WriteByte(charset[num.Int64()])
	}

	return builder.String()
}
