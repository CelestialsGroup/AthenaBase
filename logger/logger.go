package logger

import "fmt"

func Error(a ...any) {
	fmt.Println(a...)
}
func Errorf(format string, a ...any) {
	fmt.Printf(format, a...)
}

func Info(a ...any) {
	fmt.Println(a...)
}

func Infof(format string, a ...any) {
	fmt.Printf(format, a...)
}
