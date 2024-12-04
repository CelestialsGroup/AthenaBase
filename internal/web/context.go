package web

import "github.com/gin-gonic/gin"

const WebCtxKey = "web-ctx"

type WebCtx struct {
	ApiResp *WebApiRespCtx
}

func GetWebCtx(gin_ctx *gin.Context) *WebCtx {
	value, exists := gin_ctx.Get(WebCtxKey)
	if exists {
		wc, ok := value.(*WebCtx)
		if ok {
			return wc
		}
	}
	wc := &WebCtx{
		ApiResp: &WebApiRespCtx{
			GinCtx: gin_ctx,
		},
	}
	gin_ctx.Set(WebCtxKey, wc)
	return wc
}

// web api resp context
const WebApiRespCtxKey = "web-api-resp"

type WebApiRespCtx struct {
	GinCtx *gin.Context
}

func (warc *WebApiRespCtx) Get() (value any, exists bool) {
	return warc.GinCtx.Get(WebApiRespCtxKey)
}

func (warc *WebApiRespCtx) Set(value any) {
	warc.GinCtx.Set(WebApiRespCtxKey, value)
}
