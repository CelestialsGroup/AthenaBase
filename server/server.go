package server

import (
	"athenabase/logger"
	"context"
	"log"
	"os"
	"os/signal"
	"time"
)

type Server interface {
	Start(ctx context.Context) error
	Shutdown(ctx context.Context) error
}

func Start(ctx context.Context) {
	web := NewWebServer()
	servers := map[string]Server{
		"web": web,
	}
	for name, srv := range servers {
		go func(ctx context.Context, name string, srv Server) {
			if err := srv.Start(ctx); err != nil {
				logger.Errorf("Failed to start %s server: %v\n", name, err)
			} else {
				logger.Errorf("Start %s server success\n", name)
			}
		}(ctx, name, srv)
	}

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
	log.Println("Shutdown Server ...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	for name, srv := range servers {
		if err := srv.Shutdown(ctx); err != nil {
			logger.Errorf("Failed to shutdown %s server: %v\n", name, err)
		} else {
			logger.Infof("Shutdown %s server success\n", name)
		}
	}

	log.Println("Server exiting")
}
