package webapi

import (
	"athenabase/internal/model"
	"athenabase/internal/service"
	"athenabase/internal/web"

	"github.com/gin-gonic/gin"
)

func RegisterDataBaseRouter(group *gin.RouterGroup) {
	dataBaseGroup := group.Group("/database")

	dataBaseGroup.Use(web.WebAuth())

	dataBaseGroup.GET("", func(ginCtx *gin.Context) {
		ctx := ginCtx.Request.Context()
		dbs, err := service.DataBase.List(ctx)
		if err != nil {
			web.GetWebCtx(ginCtx).ApiResp.Set(err)
			return
		}
		web.GetWebCtx(ginCtx).ApiResp.Set(dbs)
	})

	dataBaseGroup.POST("", func(ginCtx *gin.Context) {
		var body model.DataBase
		if err := ginCtx.ShouldBindJSON(&body); err != nil {
			web.GetWebCtx(ginCtx).ApiResp.Set(err)
			return
		}
		ctx := ginCtx.Request.Context()
		db, err := service.DataBase.Create(ctx, &body)
		if err != nil {
			web.GetWebCtx(ginCtx).ApiResp.Set(err)
			return
		}
		web.GetWebCtx(ginCtx).ApiResp.Set(db)
	})

}