import type { ChartType, MetricData } from "../../types";

export interface MetricsChartProps {
  data: MetricData[];
  chartType: ChartType;
  height?: number;
}