import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { api } from "../services/data";
import { useDashboardStore } from "../stores/useDashboardStore";
import type { MetricData, FilterConfig } from "../types";

// -----------------------------
// PP hook
// -----------------------------
export function useMetrics() {
  const dateRange = useDashboardStore((s) => s.dateRange);
  const filters = useDashboardStore((s) => s.filters);

  const query = useQuery({
    queryKey: ["metrics", dateRange],
    queryFn: () => api.fetchMetrics(dateRange),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    select: (res) => res.data,
  });

  const filtered = useFilteredMetrics(query.data, filters);

  return {
    ...query,
    data: filtered,
    rawData: query.data,
  };
}

// -----------------------------
// Fiter hook
// -----------------------------
function useFilteredMetrics(
  data: MetricData[] | undefined,
  filters: FilterConfig[]
) {
  return useMemo(() => {
    if (!data) return [];
    if (filters.length === 0) return data;
    return applyFilters(data, filters);
  }, [data, filters]);
}

// -----------------------------
// Other hooks
// -----------------------------
export function useStats() {
  const dateRange = useDashboardStore((s) => s.dateRange);

  return useQuery({
    queryKey: ["stats", dateRange],
    queryFn: () => api.fetchStats(dateRange),
    staleTime: 1000 * 60,
  });
}

export function useCategoryBreakdown() {
  const dateRange = useDashboardStore((s) => s.dateRange);

  return useQuery({
    queryKey: ["category-breakdown", dateRange],
    queryFn: () => api.fetchCategoryBreakdown(dateRange),
    staleTime: 1000 * 60,
  });
}

// -----------------------------
// Helpers
// -----------------------------
function applyFilters(data: MetricData[], filters: FilterConfig[]) {
  return data.filter((metric) =>
    filters.every((filter) => {
      const value = metric[filter.field];

      switch (filter.operator) {
        case "equals":
          return value === filter.value;
        case "contains":
          return String(value)
            .toLowerCase()
            .includes(String(filter.value).toLowerCase());
        case "greaterThan":
          return typeof value === "number" && value > Number(filter.value);
        case "lessThan":
          return typeof value === "number" && value < Number(filter.value);
        case "between":
          return (
            typeof value === "number" &&
            Array.isArray(filter.value) &&
            value >= filter.value[0] &&
            value <= filter.value[1]
          );
        default:
          return true;
      }
    })
  );
}

// -----------------------------
// Prefetch
// -----------------------------
export function usePrefetchMetrics() {
  const queryClient = useQueryClient();
  const dateRange = useDashboardStore((s) => s.dateRange);

  return () =>
    queryClient.prefetchQuery({
      queryKey: ["metrics", dateRange],
      queryFn: () => api.fetchMetrics(dateRange),
    });
}

export { useQueryClient };
