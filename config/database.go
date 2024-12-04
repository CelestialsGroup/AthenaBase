package config

import (
	"fmt"

	"github.com/spf13/viper"
)

func init() {
	viper.SetDefault("database.type", "sqlite")
	viper.SetDefault("database.host", "athena-base.db")
	viper.SetDefault("database.config", "mode=rwc")
}

type DataBase struct {
	Type   string `mapstructure:"type"`
	Host   string `mapstructure:"host"`
	Port   int    `mapstructure:"port"`
	Name   string `mapstructure:"name"`
	User   string `mapstructure:"user"`
	Pass   string `mapstructure:"pass"`
	Config string `mapstructure:"config"`
}

func (db DataBase) DSN() string {
	if db.Type == "sqlite" {
		return fmt.Sprintf("file:%s?%s", db.Host, db.Config)
	}
	return fmt.Sprintf("%s://%s:%s@%s:%d?%s", db.Type, db.User, db.Pass, db.Host, db.Port, db.Config)
}

var database *DataBase

func GetDataBaseConfig() DataBase {
	if database != nil {
		return *database
	}
	database = &DataBase{}
	err := viper.UnmarshalKey("database", database)
	if err != nil {
		panic(fmt.Errorf("error unmarshalling database config: %w", err))
	}
	return *database
}
