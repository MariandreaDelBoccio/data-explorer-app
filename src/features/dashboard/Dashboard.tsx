import { useState } from "react";
import { Activity, TrendingUp, AlertTriangle, XCircle } from "lucide-react";
import { useDashboardStore } from "../../stores/useDashboardStore";
import type { ChartType } from "../../types";
import { useMetrics, useStats } from "../../hooks/useMetrics";
import { Card } from "../../components/ui/Cards/Card";
import { StatCard } from "../../components/ui/Cards/StatCard";
import { FilterPanel } from "../filters/FilterPanel";
import { SavedViews } from "../views/SavedViews";
import { MetricsChart } from "../../components/charts/MetricsChart";

export function Dashboard() {
  const [chartType, setChartType] = useState<ChartType>("line");
  const selectedView = useDashboardStore((state) => state.selectedView);

  const { data: metrics, isLoading, error } = useMetrics();
  const { data: stats } = useStats();

  // Use chart type from selected view or local state
  const activeChartType = selectedView?.chartType || chartType;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <div className="text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Error Loading Data
            </h3>
            <p className="text-gray-600">
              {error instanceof Error ? error.message : "Something went wrong"}
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Data Explorer
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Monitor and analyze your metrics in real-time
              </p>
            </div>
            {selectedView && (
              <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-900">
                  Viewing: {selectedView.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Metrics"
              value={stats.total.toLocaleString()}
              icon={<Activity className="w-6 h-6" />}
            />
            <StatCard
              title="Success Rate"
              value={`${stats.successRate}%`}
              change={{ value: 2.5, isPositive: true }}
              icon={<TrendingUp className="w-6 h-6" />}
            />
            <StatCard
              title="Warnings"
              value={stats.warning}
              icon={<AlertTriangle className="w-6 h-6" />}
            />
            <StatCard
              title="Errors"
              value={stats.error}
              change={{ value: 1.2, isPositive: false }}
              icon={<XCircle className="w-6 h-6" />}
            />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Filters & Views */}
          <div className="space-y-6">
            <FilterPanel />
            <SavedViews />
          </div>

          {/* Right Column - Chart */}
          <div className="lg:col-span-2">
            <Card
              title="Metrics Visualization"
              subtitle={`Showing ${metrics.length} data points`}
              actions={
                <div className="flex gap-2">
                  {(["line", "bar", "area", "pie"] as ChartType[]).map(
                    (type) => (
                      <button
                        key={type}
                        onClick={() => setChartType(type)}
                        className={`px-3 py-1 text-sm rounded transition-colors ${
                          activeChartType === type
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    )
                  )}
                </div>
              }
            >
              {isLoading ? (
                <div className="h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading metrics...</p>
                  </div>
                </div>
              ) : metrics.length > 0 ? (
                <MetricsChart
                  data={metrics}
                  chartType={activeChartType}
                  height={400}
                />
              ) : (
                <div className="h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      No data matches your filters
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Try adjusting or removing some filters
                    </p>
                  </div>
                </div>
              )}
            </Card>

            {/* Data Table Preview */}
            {metrics.length > 0 && (
              <Card title="Recent Metrics" className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">
                          Time
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">
                          Category
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">
                          Value
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {metrics.slice(0, 10).map((metric) => (
                        <tr key={metric.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-900">
                            {new Date(metric.timestamp).toLocaleTimeString()}
                          </td>
                          <td className="px-4 py-3 text-gray-900">
                            {metric.category}
                          </td>
                          <td className="px-4 py-3 text-gray-900">
                            {metric.value.toFixed(2)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                metric.status === "success"
                                  ? "bg-green-100 text-green-800"
                                  : metric.status === "warning"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {metric.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
