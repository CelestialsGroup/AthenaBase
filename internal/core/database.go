package core

import (
	"athenabase/logger"
	"database/sql"
	"fmt"
	"sync"
	"time"

	_ "github.com/go-sql-driver/mysql"
	_ "github.com/jackc/pgx/v5/stdlib"
)

// relational database
type database struct {
	activeTime time.Time
	db         *sql.DB
}

// non relational database
// TODO ...

var databasepool = make(map[string]*database)
var dbmu = &sync.Mutex{}

func (*core) GetDataBase(driver string, dsn string) (*sql.DB, error) {
	dbmu.Lock()
	defer dbmu.Unlock()

	key := driver + "-" + dsn
	md, ok := databasepool[key]
	if ok {
		md.activeTime = time.Now()
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

	databasepool[key] = &database{
		activeTime: time.Now(),
		db:         db,
	}
	return db, nil
}

func (*core) CloseDataBase(driver string, dsn string) error {
	dbmu.Lock()
	defer dbmu.Unlock()

	key := driver + "-" + dsn
	md, ok := databasepool[key]
	if !ok {
		return fmt.Errorf("%s - %s not fount", driver, dsn)
	}
	md.db.Close()
	delete(databasepool, key)
	return nil
}
