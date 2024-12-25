import logger from "@internal/helper/logger";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shadcn/component/ui/table";
import {
	getCoreRowModel,
	useReactTable,
	flexRender,
	ColumnDef
} from "@tanstack/react-table";
import React from "react";

interface ResultProps {
	result: QueryResult
}

type TableRowData = { [key: number]: string };

const Result: React.FC<ResultProps> = (props) => {
	const data = React.useMemo(() => {
		return props.result.results.map(
			result => result.reduce((acc, curr, index) => {
				acc[index] = curr;
				return acc;
			}, {} as TableRowData)
		);
	}, [props.result]);
	const columns: ColumnDef<TableRowData, any>[] = React.useMemo(() => {
		return props.result.columns.map((col, index) => {
			const rowKey = index.toString();
			return {
				accessorKey: rowKey,
				header: (context) => {
					logger.debug(context);
					return <div>{col.name} ({col.type.toLowerCase()})</div>;
				},
				cell: ({ row }) => {
					return <div className="capitalize">{row.getValue(rowKey)}</div>;
				},
			};
		});
	}, [props.result]);
	const table = useReactTable<TableRowData>({
		data: data, columns: columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return <div className="w-full h-full border rounded-lg">
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => <TableRow key={headerGroup.id}>
					{headerGroup.headers.map((header) => <TableHead key={header.id}>
						{header.isPlaceholder
							? null
							: flexRender(
								header.column.columnDef.header,
								header.getContext()
							)}
					</TableHead>)}
				</TableRow>)}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows.map((row) => (
					<TableRow key={row.id} >
						{row.getVisibleCells().map((cell) => (
							<TableCell key={cell.id}>
								{flexRender(
									cell.column.columnDef.cell,
									cell.getContext()
								)}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	</div>;
};

export default Result;