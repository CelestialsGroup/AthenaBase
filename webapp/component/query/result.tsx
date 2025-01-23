import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@component/ui/table";
import logger from "@internal/helper/logger";
import { Badge } from "@shadcn/component/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shadcn/component/ui/tooltip"; // 导入 Tooltip 组件
import {
	getCoreRowModel,
	useReactTable,
	flexRender,
	ColumnDef
} from "@tanstack/react-table";
import React from "react";
interface ResultProps {
	result: QueryResult
	className?: string
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
					return (
						<Tooltip>
							<TooltipTrigger asChild>
								<div className="text-center">
									<Badge variant="outline">{col.name}</Badge>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								{col.type.toLowerCase()}
							</TooltipContent>
						</Tooltip>
					);
				},
				cell: ({ row }) => {
					return <div
						className="max-w-96 text-center whitespace-nowrap overflow-auto scrollbar-none hover:bg-muted/50 p-2 rounded-lg cursor-pointer"
					>{row.getValue(rowKey)}</div>;
				},
			};
		});
	}, [props.result]);
	const table = useReactTable<TableRowData>({
		data: data, columns: columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return <Table className={props.className}>
		<TableHeader className="sticky top-0 bg-muted/80 backdrop-blur rounded-lg">
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
				<TableRow key={row.id} className="hover:bg-transparent">
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
	</Table>;
};

export default Result;