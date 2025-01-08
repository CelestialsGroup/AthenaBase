interface QueryResult {
	columns: {
		name: string
		type: string
	}[]
	results: string[][]
}


interface QueryChartProps {
	data: QueryResult
	className?: string
}