package migrate

import "athenabase/internal/model"

func init() {
	Migrate["v0.0.0"] = func() {
		model.MasterDB().NewCreateTable()
	}
}
