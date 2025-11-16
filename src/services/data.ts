import type { MetricData, APIResponse, DateRange } from "../types";

function generateMetricData(count: number, dateRange: DateRange): MetricData[] {
  const categories = ["API", "Database", "Cache", "Network", "Server"];
  const statuses: Array<"success" | "warning" | "error"> = [
    "success",
    "warning",
    "error",
  ];
  const metrics: MetricData[] = [];

  const startTime = dateRange.start.getTime();
  const endTime = dateRange.end.getTime();
  const timeStep = (endTime - startTime) / count;

  for (let i = 0; i < count; i++) {
    const timestamp = new Date(startTime + i * timeStep);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    let value: number;
    if (status === "success") {
      value = 50 + Math.random() * 30; // 50-80
    } else if (status === "warning") {
      value = 80 + Math.random() * 15; // 80-95
    } else {
      value = 95 + Math.random() * 5; // 95-100
    }

    metrics.push({
      id: `metric-${i}`,
      timestamp: timestamp.toISOString(),
      value: Math.round(value * 100) / 100,
      category,
      status,
      metadata: {
        region: ["us-east", "eu-west", "ap-south"][
          Math.floor(Math.random() * 3)
        ],
        endpoint: `/api/v${
          Math.floor(Math.random() * 3) + 1
        }/${category.toLowerCase()}`,
      },
    });
  }

  return metrics;
}

// API Functions
export const api = {
  async fetchMetrics(
    dateRange: DateRange,
    page = 1,
    pageSize = 100
  ): Promise<APIResponse<MetricData[]>> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const allMetrics = generateMetricData(500, dateRange);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedMetrics = allMetrics.slice(start, end);

    return {
      data: paginatedMetrics,
      total: allMetrics.length,
      page,
      pageSize,
    };
  },

  // Fetch aggregated stats
  async fetchStats(dateRange: DateRange) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const metrics = generateMetricData(100, dateRange);

    const total = metrics.length;
    const successCount = metrics.filter((m) => m.status === "success").length;
    const warningCount = metrics.filter((m) => m.status === "warning").length;
    const errorCount = metrics.filter((m) => m.status === "error").length;

    const avgValue = metrics.reduce((sum, m) => sum + m.value, 0) / total;

    return {
      total,
      success: successCount,
      warning: warningCount,
      error: errorCount,
      avgValue: Math.round(avgValue * 100) / 100,
      successRate: Math.round((successCount / total) * 100 * 100) / 100,
    };
  },

  // Category breakdown
  async fetchCategoryBreakdown(dateRange: DateRange) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const metrics = generateMetricData(200, dateRange);
    const breakdown = metrics.reduce((acc, metric) => {
      if (!acc[metric.category]) {
        acc[metric.category] = { count: 0, avgValue: 0, totalValue: 0 };
      }
      acc[metric.category].count += 1;
      acc[metric.category].totalValue += metric.value;
      return acc;
    }, {} as Record<string, { count: number; avgValue: number; totalValue: number }>);

    // Calculate averages
    Object.keys(breakdown).forEach((key) => {
      breakdown[key].avgValue =
        Math.round((breakdown[key].totalValue / breakdown[key].count) * 100) /
        100;
    });

    return breakdown;
  },
};

export default api;
