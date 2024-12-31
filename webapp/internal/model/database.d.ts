interface DataBase {
	id: number
	engine: string
	name: string
	host: string
	port: number
	db: string
	username: string
	password: string
	config: string
}


interface DataBaseTableColumn {
	name: string
	type: string
	comment: string
}

interface DataBaseTable {
	name: string
	columns: DataBaseTableColumn[]
	comment: string
}