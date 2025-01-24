package logger

import "fmt"

func Debug(a ...any) {
	fmt.Println(a...)
}

func Debugf(format string, a ...any) {
	fmt.Printf(format, a...)
}

func Info(a ...any) {
	fmt.Println(a...)
}

func Infof(format string, a ...any) {
	fmt.Printf(format, a...)
}

func Error(a ...any) {
	fmt.Println(a...)
}
func Errorf(format string, a ...any) {
	fmt.Printf(format, a...)
}
