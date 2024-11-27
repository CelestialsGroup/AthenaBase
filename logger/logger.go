package logger

import "fmt"

func Errorf(format string, a ...any) {
	fmt.Printf(format, a...)
}

func Infof(format string, a ...any) {
	fmt.Printf(format, a...)
}
