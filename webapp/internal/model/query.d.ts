interface QueryResult {
	columns: {
		name: string
		type: string
	}[]
	results: { [key: string]: string }[]
}