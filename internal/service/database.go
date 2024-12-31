package service

import (
	"athenabase/internal"
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

func (database) GetDataBase(ctx context.Context, id int64) (*model.DataBase, error) {
	db := new(model.DataBase)
	err := model.MasterDB().NewSelect().Model(db).Where("id = ?", id).Scan(ctx)
	if err != nil {
		return nil, err
	}
	return db, nil
}

type DataBaseTableColumn struct {
	Name    string `json:"name"`
	Type    string `json:"type"`
	Comment string `json:"comment"`
}

type DataBaseTable struct {
	Name    string                `json:"name"`
	Comment string                `json:"comment"`
	Columns []DataBaseTableColumn `json:"columns"`
}

func (database) GetTables(ctx context.Context, db *model.DataBase) ([]*DataBaseTable, error) {
	sqlDB, err := internal.Core.GetDataBase(db.DriverName(), db.DSN())
	if err != nil {
		return nil, err
	}
	rows, err := sqlDB.QueryContext(ctx, db.TableSQL())
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tables []*DataBaseTable
	tableMap := make(map[string]*DataBaseTable)

	for rows.Next() {
		var tableName, tableComment, columnName, dataType, columnComment string
		err := rows.Scan(&tableName, &tableComment, &columnName, &dataType, &columnComment)
		if err != nil {
			return nil, err
		}

		if _, exists := tableMap[tableName]; !exists {
			tableMap[tableName] = &DataBaseTable{
				Name:    tableName,
				Comment: tableComment,
			}
			tables = append(tables, tableMap[tableName])
		}

		column := DataBaseTableColumn{
			Name:    columnName,
			Type:    dataType,
			Comment: columnComment,
		}
		tableMap[tableName].Columns = append(tableMap[tableName].Columns, column)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return tables, nil
}

var DataBase = database{}
