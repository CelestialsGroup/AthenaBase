package webapi

import (
	"athenabase/internal"
	"athenabase/internal/service"
	"athenabase/internal/web"

	"github.com/gin-gonic/gin"
)

func RegisterAuthRouter(group *gin.RouterGroup) {
	authGroup := group.Group("/auth")

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
		session, err := service.Auth.CreateSession(ctx, authUser)
		if err != nil {
			web.GetWebCtx(ginCtx).ApiResp.Set(err)
			return
		}
		ginCtx.SetCookie(internal.AuthSessionCookieName, session.ID, 2147483647, "/", "", false, true)
		web.GetWebCtx(ginCtx).ApiResp.Set(authUser)
	})

	authGroup.GET("/logout", func(ginCtx *gin.Context) {
		ginCtx.SetCookie(internal.AuthSessionCookieName, "", -1, "/", "", false, true)
		web.GetWebCtx(ginCtx).ApiResp.Set(true)
	})

	authGroup.GET("/user", web.WebAuth(), func(ginCtx *gin.Context) {
		session := web.GetWebCtx(ginCtx).Session.Get()
		web.GetWebCtx(ginCtx).ApiResp.Set(session.AuthUser)
	})
}
