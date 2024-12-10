package service

import (
	"athenabase/internal/model"
	"context"
)

type database struct{}

func (database) List(ctx context.Context) ([]model.DataBase, error) {
	var dbs []model.DataBase
	err := model.MasterDB().NewSelect().Model(&dbs).Scan(ctx)
	if err != nil {
		return nil, err
	}
	return dbs, nil
}

func (database) Create(ctx context.Context, db *model.DataBase) (*model.DataBase, error) {
	_, err := model.MasterDB().NewInsert().Model(db).Exec(ctx)
	if err != nil {
		return nil, err
	}
	return db, nil
}

var DataBase = database{}
