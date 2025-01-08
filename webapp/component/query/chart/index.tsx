import BarChart, { BarChartConfig } from "@component/query/chart/bar";
import TableChart, { TableChartConfig } from "@component/query/chart/table";
import React from "react";


export type ChartConfig = TableChartConfig | BarChartConfig
export type ChartType = "table" | "bar"

interface ChartProps<T extends ChartConfig = ChartConfig> {
	type: ChartType
	config: T
}

const Chart: React.FC<ChartProps & QueryChartProps> = ({ type, data, config }) => {
	const chart = () => {
		switch (type) {
			case "table":
				return <TableChart className="w-fit min-w-full" data={data} {...config as TableChartConfig} />;
			case "bar":
				return <BarChart className="w-full h-full" data={data} {...config as BarChartConfig} />;
			default:
				return <React.Fragment></React.Fragment>;
		}
	};
	return chart();
};

export default Chart;