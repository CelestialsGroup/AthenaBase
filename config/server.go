package config

import (
	"fmt"
	"sync"

	"github.com/spf13/viper"
)

func init() {
	viper.SetDefault("web.host", "0.0.0.0")
	viper.SetDefault("web.port", 8080)
}

type WebServer struct {
	Host string `mapstructure:"host"`
	Port int    `mapstructure:"port"`
}

var webServerLock = &sync.Mutex{}
var webServer *WebServer

func GetWebServerConfig() WebServer {
	if webServer != nil {
		return *webServer
	}

	webServerLock.Lock()
	defer webServerLock.Unlock()
	webServer = new(WebServer)
	err := viper.UnmarshalKey("web", webServer)
	if err != nil {
		panic(fmt.Errorf("error unmarshalling web server config: %w", err))
	}
	return *webServer
}
