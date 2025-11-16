// API Data Types
export interface MetricData {
  id: string;
  timestamp: string;
  value: number;
  category: string;
  status: "success" | "warning" | "error";
  metadata?: Record<string, unknown>;
}

export interface APIResponse<T> {
  data: T;
  total: number;
  page: number;
  pageSize: number;
}

// Filter Types
export interface FilterConfig {
  id: string;
  field: keyof MetricData;
  operator: "equals" | "contains" | "greaterThan" | "lessThan" | "between";
  value: string | number | [number, number];
}

export interface DateRange {
  start: Date;
  end: Date;
}

// View Types
export interface SavedView {
  id: string;
  name: string;
  description?: string;
  filters: FilterConfig[];
  dateRange: DateRange;
  chartType: ChartType;
  createdAt: string;
  updatedAt: string;
}

export type ChartType = "line" | "bar" | "area" | "pie";

// Store Types
export interface DashboardStore {
  metrics: MetricData[];
  isLoading: boolean;
  error: string | null;
  filters: FilterConfig[];
  dateRange: DateRange;
  selectedView: SavedView | null;
  savedViews: SavedView[];

  // Actions
  setMetrics: (metrics: MetricData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addFilter: (filter: FilterConfig) => void;
  removeFilter: (filterId: string) => void;
  updateFilter: (filterId: string, filter: Partial<FilterConfig>) => void;
  setDateRange: (range: DateRange) => void;
  saveView: (view: Omit<SavedView, "id" | "createdAt" | "updatedAt">) => void;
  loadView: (viewId: string) => void;
  deleteView: (viewId: string) => void;
}

// Chart Config Types
export interface ChartConfig {
  type: ChartType;
  xAxisKey: string;
  yAxisKey: string;
  dataKey: string;
  color?: string;
}
