package config

import (
	"github.com/spf13/viper"
)

func init() {
	viper.SetEnvPrefix("ab")
	viper.AutomaticEnv()
}
