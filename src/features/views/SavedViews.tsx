import { useState } from "react";
import { Save, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import { useDashboardStore } from "../../stores/useDashboardStore";
import type { ChartType } from "../../types";
import { Card } from "../../components/ui/Cards/Card";
import { Button } from "../../components/ui/Button/Button";

export function SavedViews() {
  const [isCreating, setIsCreating] = useState(false);
  const [viewName, setViewName] = useState("");
  const [viewDescription, setViewDescription] = useState("");
  const [chartType, setChartType] = useState<ChartType>("line");

  const savedViews = useDashboardStore((state) => state.savedViews);
  const selectedView = useDashboardStore((state) => state.selectedView);
  const filters = useDashboardStore((state) => state.filters);
  const dateRange = useDashboardStore((state) => state.dateRange);
  const saveView = useDashboardStore((state) => state.saveView);
  const loadView = useDashboardStore((state) => state.loadView);
  const deleteView = useDashboardStore((state) => state.deleteView);

  const handleSaveView = () => {
    if (!viewName.trim()) return;

    saveView({
      name: viewName,
      description: viewDescription,
      filters,
      dateRange,
      chartType,
    });

    setViewName("");
    setViewDescription("");
    setIsCreating(false);
  };

  return (
    <Card
      title="Saved Views"
      subtitle={`${savedViews.length} saved view${
        savedViews.length !== 1 ? "s" : ""
      }`}
      actions={
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsCreating(!isCreating)}
        >
          <Save className="w-4 h-4" />
        </Button>
      }
    >
      <div className="space-y-3">
        {/* Save New View Form */}
        {isCreating && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                View Name
              </label>
              <input
                type="text"
                value={viewName}
                onChange={(e) => setViewName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="My Custom View"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (optional)
              </label>
              <textarea
                value={viewDescription}
                onChange={(e) => setViewDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={2}
                placeholder="What does this view show?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chart Type
              </label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value as ChartType)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="area">Area Chart</option>
                <option value="pie">Pie Chart</option>
              </select>
            </div>

            <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
              This will save {filters.length} filter(s) and current date range
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSaveView}
                disabled={!viewName.trim()}
              >
                Save View
              </Button>
            </div>
          </div>
        )}

        {/* Saved Views List */}
        <div className="space-y-2">
          {savedViews.map((view) => (
            <div
              key={view.id}
              className={`p-3 rounded-lg border transition-colors ${
                selectedView?.id === view.id
                  ? "bg-blue-50 border-blue-300"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{view.name}</h4>
                  {view.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {view.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>{view.filters.length} filters</span>
                    <span>•</span>
                    <span>{view.chartType} chart</span>
                    <span>•</span>
                    <span>
                      {format(new Date(view.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={() => loadView(view.id)}
                    className="p-2 hover:bg-blue-100 rounded transition-colors"
                    aria-label="Load view"
                  >
                    <Eye className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => deleteView(view.id)}
                    className="p-2 hover:bg-red-100 rounded transition-colors"
                    aria-label="Delete view"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {savedViews.length === 0 && !isCreating && (
          <p className="text-sm text-gray-500 text-center py-4">
            No saved views yet. Click + to create your first view.
          </p>
        )}
      </div>
    </Card>
  );
}
