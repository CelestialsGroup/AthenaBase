package webapi

import (
	"athenabase/internal"
	"athenabase/internal/web"
	"fmt"

	"github.com/gin-gonic/gin"
)

func RegisterRouterGroup(group *gin.RouterGroup) {
	group.Use(web.WebApiResp())

	group.GET("/properties", func(ginCtx *gin.Context) {
		for key, value := range ginCtx.Request.Header {
			fmt.Printf("%s: %s\n", key, value)
		}
		web.GetWebCtx(ginCtx).ApiResp.Set(map[string]any{
			"version": internal.Version,
		})
	})

	RegisterAuthRouter(group)
}
