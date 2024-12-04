package webapi

import (
	"athenabase/internal"
	"athenabase/internal/web"

	"github.com/gin-gonic/gin"
)

func RegisterRouterGroup(group *gin.RouterGroup) {
	group.Use(web.WebApiResp())

	group.GET("/properties", func(ginCtx *gin.Context) {
		web.GetWebCtx(ginCtx).ApiResp.Set(map[string]any{
			"version": internal.Version,
		})
	})
}
