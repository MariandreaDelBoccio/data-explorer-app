import { useState } from "react";
import { X, Plus, Filter } from "lucide-react";
import type { FilterConfig, MetricData } from "../../types";
import { useDashboardStore } from "../../stores/useDashboardStore";
import { Card } from "../../components/ui/Cards/Card";
import { Button } from "../../components/ui/Button/Button";
import { FILTER_FIELDS, OPERATORS } from "../constants";

export function FilterPanel() {
  const filters = useDashboardStore((state) => state.filters);
  const addFilter = useDashboardStore((state) => state.addFilter);
  const removeFilter = useDashboardStore((state) => state.removeFilter);

  const [isAddingFilter, setIsAddingFilter] = useState(false);
  const [newFilter, setNewFilter] = useState<Partial<FilterConfig>>({
    field: "category",
    operator: "equals",
    value: "",
  });

  const handleAddFilter = () => {
    if (newFilter.field && newFilter.operator && newFilter.value) {
      addFilter({
        id: crypto.randomUUID(),
        field: newFilter.field,
        operator: newFilter.operator,
        value: newFilter.value,
      } as FilterConfig);

      setNewFilter({ field: "category", operator: "equals", value: "" });
      setIsAddingFilter(false);
    }
  };

  return (
    <Card
      title="Filters"
      subtitle={`${filters.length} active filter${
        filters.length !== 1 ? "s" : ""
      }`}
      actions={
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsAddingFilter(!isAddingFilter)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      }
    >
      <div className="space-y-3">
        {/* Active Filters */}
        {filters.map((filter) => (
          <div
            key={filter.id}
            className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200"
          >
            <Filter className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <div className="flex-1 text-sm">
              <span className="font-medium text-gray-900">{filter.field}</span>
              <span className="text-gray-600 mx-2">{filter.operator}</span>
              <span className="font-medium text-gray-900">
                "{filter.value}"
              </span>
            </div>
            <button
              onClick={() => removeFilter(filter.id)}
              className="p-1 hover:bg-blue-100 rounded transition-colors"
              aria-label="Remove filter"
            >
              <X className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        ))}

        {/* Add New Filter Form */}
        {isAddingFilter && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Field
                </label>
                <select
                  value={newFilter.field}
                  onChange={(e) =>
                    setNewFilter({
                      ...newFilter,
                      field: e.target.value as keyof MetricData,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {FILTER_FIELDS.map((field) => (
                    <option key={field.value} value={field.value}>
                      {field.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Operator
                </label>
                <select
                  value={newFilter.operator}
                  onChange={(e) =>
                    setNewFilter({
                      ...newFilter,
                      operator: e.target.value as FilterConfig["operator"],
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {OPERATORS.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Value
                </label>
                <input
                  type="text"
                  value={newFilter.value as string | number}
                  onChange={(e) =>
                    setNewFilter({ ...newFilter, value: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter value..."
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsAddingFilter(false)}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleAddFilter}>
                Add Filter
              </Button>
            </div>
          </div>
        )}

        {filters.length === 0 && !isAddingFilter && (
          <p className="text-sm text-gray-500 text-center py-4">
            No filters applied. Click + to add a filter.
          </p>
        )}
      </div>
    </Card>
  );
}
