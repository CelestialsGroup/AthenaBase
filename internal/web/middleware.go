package web

import (
	"athenabase/internal"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type WebApiResponse struct {
	StatusCode    int           `json:"status_code"`
	StatusMessage string        `json:"status_message"`
	Success       bool          `json:"success"`
	Data          any           `json:"data"`
	RespTime      string        `json:"resp_time"`
	Latency       time.Duration `json:"latency"`
}

func WebApiResp() gin.HandlerFunc {
	return func(gin_ctx *gin.Context) {
		t := time.Now()

		gin_ctx.Next()

		latency := time.Since(t)

		value, exists := GetWebCtx(gin_ctx).ApiResp.Get()
		if exists {
			switch v := value.(type) {
			case error:
				StatusCode := internal.SystemErrorCode
				if err, ok := v.(*internal.InternalError); ok {
					StatusCode = err.Code
				}
				gin_ctx.JSON(http.StatusBadRequest, WebApiResponse{
					StatusCode:    StatusCode,
					StatusMessage: v.Error(),
					Success:       false,
					Data:          nil,
					RespTime:      time.Now().Format("2006-01-02 15:04:05"),
					Latency:       time.Duration(latency.Milliseconds()),
				})
			default:
				gin_ctx.JSON(http.StatusOK, WebApiResponse{
					StatusCode:    0,
					StatusMessage: "success",
					Success:       true,
					Data:          value,
					RespTime:      time.Now().Format("2006-01-02 15:04:05"),
					Latency:       time.Duration(latency.Milliseconds()),
				})
			}
		}
	}
}
