package service

import (
	"athenabase/logger"
	"database/sql"
	"fmt"
	"sync"
	"time"

	_ "github.com/go-sql-driver/mysql"
	_ "github.com/jackc/pgx/v5/stdlib"
)

type coredatabase struct {
	active_time time.Time
	db          *sql.DB
}

type core struct {
	mu sync.RWMutex
	md map[string]*coredatabase
}

func (c *core) GetDataBase(driver string, dsn string) (*sql.DB, error) {
	c.mu.Lock()
	defer c.mu.Unlock()

	key := driver + "-" + dsn
	md, ok := c.md[key]
	if ok {
		md.active_time = time.Now()
		return md.db, nil
	}

	logger.Infof("connect database %s %s", driver, dsn)

	db, err := sql.Open(driver, dsn)
	if err != nil {
		return nil, fmt.Errorf("%w (core database/sql open error)", err)
	}
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("%w (core database ping  error)", err)
	}

	c.md[key] = &coredatabase{
		active_time: time.Now(),
		db:          db,
	}
	return db, nil
}

func (c *core) CloseDataBase(database_type string, dsn string) error {
	c.mu.Lock()
	defer c.mu.Unlock()

	key := database_type + "-" + dsn
	md, ok := c.md[key]
	if !ok {
		return fmt.Errorf("%s - %s not fount", database_type, dsn)
	}
	md.db.Close()
	delete(c.md, key)
	return nil
}

var Core = &core{
	md: make(map[string]*coredatabase),
}
