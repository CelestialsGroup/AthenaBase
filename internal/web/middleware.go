package web

import (
	"athenabase/internal"
	"athenabase/internal/service"
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
	return func(ginCtx *gin.Context) {
		t := time.Now()

		ginCtx.Next()

		latency := time.Since(t)

		value, exists := GetWebCtx(ginCtx).ApiResp.Get()
		if exists {
			switch v := value.(type) {
			case error:
				StatusCode := internal.SystemErrorCode
				if err, ok := v.(*internal.InternalError); ok {
					StatusCode = err.Code
				}
				ginCtx.JSON(http.StatusBadRequest, WebApiResponse{
					StatusCode:    StatusCode,
					StatusMessage: v.Error(),
					Success:       false,
					Data:          nil,
					RespTime:      time.Now().Format("2006-01-02 15:04:05"),
					Latency:       time.Duration(latency.Milliseconds()),
				})
			default:
				ginCtx.JSON(http.StatusOK, WebApiResponse{
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

func WebAuth() gin.HandlerFunc {
	return func(ginCtx *gin.Context) {
		sessionID, err := ginCtx.Cookie(internal.AuthSessionCookieName)
		if err != nil {
			GetWebCtx(ginCtx).ApiResp.Set(err)
			ginCtx.Abort()
			return
		}
		ctx := ginCtx.Request.Context()
		authSession, err := service.Auth.GetSession(ctx, sessionID)
		if err != nil {
			GetWebCtx(ginCtx).ApiResp.Set(err)
			ginCtx.Abort()
			return
		}
		authUser, err := service.Auth.GetUser(ctx, authSession.AuthUserID)
		if err != nil {
			GetWebCtx(ginCtx).ApiResp.Set(err)
			ginCtx.Abort()
			return
		}
		GetWebCtx(ginCtx).Session.Set(&WebSession{
			AuthSession: authSession,
			AuthUser:    authUser,
		})
		ginCtx.Next()
	}
}
