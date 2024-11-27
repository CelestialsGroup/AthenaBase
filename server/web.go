package server

import (
	"athenabase/logger"
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type WebServer struct {
	server *http.Server
}

func (ws *WebServer) Start(ctx context.Context) error {
	if ws.server != nil {
		return nil
	}

	engine := gin.New()
	engine.Use(gin.Logger(), gin.Recovery())
	engine.GET("/ping", func(gin_ctx *gin.Context) {
		gin_ctx.JSON(200, gin.H{
			"message": "pong",
		})
	})
	engine.Static("/static/", "./webapp/dist/")
	engine.NoRoute(func(c *gin.Context) {
		c.File("./webapp/dist/index.html")
	})

	address := "0.0.0.0:8080"
	ws.server = &http.Server{
		Addr:    address,
		Handler: engine,
	}
	errChan := make(chan error, 1)
	go func() {
		if err := ws.server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Errorf("Listen: %s\n", err)
			errChan <- err
		}
		close(errChan)
	}()
	logger.Infof("%s Server Run http://%s/ \r\n", time.Now().String(), ws.server.Addr)
	logger.Infof("%s Enter Control + C Shutdown Server \r\n", time.Now().String())

	if err, ok := <-errChan; ok {
		return err
	}
	return nil
}

func (ws *WebServer) Shutdown(ctx context.Context) error {
	if ws.server == nil {
		return nil
	}
	return ws.server.Shutdown(ctx)
}

func NewWebServer() *WebServer {
	return &WebServer{}
}
