package webapi

import (
	"athenabase/internal"
	"athenabase/internal/service"
	"athenabase/internal/web"

	"github.com/gin-gonic/gin"
)

func RegisterAuthRouter(group *gin.RouterGroup) {
	authGroup := group.Group("/auth")

	authGroup.GET("/user", func(ginCtx *gin.Context) {
		web.GetWebCtx(ginCtx).ApiResp.Set(
			internal.AuthUserNotFoundError,
		)
	})

	authGroup.POST("/login", func(ginCtx *gin.Context) {
		var body struct {
			Email    string `json:"email"`
			PassWord string `json:"password"`
		}
		if err := ginCtx.ShouldBindJSON(&body); err != nil {
			web.GetWebCtx(ginCtx).ApiResp.Set(err)
			return
		}
		ctx := ginCtx.Request.Context()
		authUser, err := service.Auth.ChechAuthUser(ctx, body.Email, body.PassWord)
		if err != nil {
			web.GetWebCtx(ginCtx).ApiResp.Set(err)
			return
		}
		web.GetWebCtx(ginCtx).ApiResp.Set(authUser)
	})
}
