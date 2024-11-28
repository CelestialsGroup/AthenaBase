package internal

type InternalError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func (e *InternalError) Error() string {
	return e.Message
}

func NewInternalError(code int, message string) error {
	return &InternalError{Code: code, Message: message}
}

func ErrMsg(err error) string {
	if err == nil {
		return ""
	}
	return err.Error()
}

var (
	SystemErrorCode = 1000
	SystemError     = func(err error) *InternalError {
		return &InternalError{Code: SystemErrorCode, Message: "System Error: " + ErrMsg(err)}
	}
)
