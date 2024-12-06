package web

import (
	"athenabase/internal/model"

	"github.com/gin-gonic/gin"
)

const WebCtxKey = "web-ctx"

type WebCtx struct {
	ApiResp *WebApiRespCtx
	Session *WebSessionCtx
}

func GetWebCtx(ginCtx *gin.Context) *WebCtx {
	value, exists := ginCtx.Get(WebCtxKey)
	if exists {
		wc, ok := value.(*WebCtx)
		if ok {
			return wc
		}
	}
	wc := &WebCtx{
		ApiResp: &WebApiRespCtx{GinCtx: ginCtx},
		Session: &WebSessionCtx{GinCtx: ginCtx},
	}
	ginCtx.Set(WebCtxKey, wc)
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

// web session context
const WebSessionCtxKey = "web-session"

type WebSessionCtx struct {
	GinCtx *gin.Context
}

func (ws *WebSessionCtx) Get() *WebSession {
	value, exists := ws.GinCtx.Get(WebSessionCtxKey)
	if !exists {
		return nil
	}
	session, ok := value.(*WebSession)
	if !ok {
		return nil
	}
	return session
}

func (ws *WebSessionCtx) Set(session *WebSession) {
	ws.GinCtx.Set(WebSessionCtxKey, session)
}

type WebSession struct {
	AuthUser    *model.AuthUser
	AuthSession *model.AuthSession
}
