import { describe, it, expect, beforeEach } from "vitest";
import { useDashboardStore } from "../stores/useDashboardStore";
import type { FilterConfig } from "../types";

describe("useDashboardStore", () => {
  beforeEach(() => {
    // Reset store before each test
    const { filters, savedViews } = useDashboardStore.getState();
    filters.forEach((f) => useDashboardStore.getState().removeFilter(f.id));
    savedViews.forEach((v) => useDashboardStore.getState().deleteView(v.id));
  });

  describe("Filter Management", () => {
    it("should add a filter", () => {
      const filter: FilterConfig = {
        id: "1",
        field: "category",
        operator: "equals",
        value: "API",
      };

      useDashboardStore.getState().addFilter(filter);
      const { filters } = useDashboardStore.getState();

      expect(filters).toHaveLength(1);
      expect(filters[0]).toEqual(filter);
    });

    it("should remove a filter", () => {
      const filter: FilterConfig = {
        id: "1",
        field: "category",
        operator: "equals",
        value: "API",
      };

      useDashboardStore.getState().addFilter(filter);
      useDashboardStore.getState().removeFilter("1");

      const { filters } = useDashboardStore.getState();
      expect(filters).toHaveLength(0);
    });

    it("should update a filter", () => {
      const filter: FilterConfig = {
        id: "1",
        field: "category",
        operator: "equals",
        value: "API",
      };

      useDashboardStore.getState().addFilter(filter);
      useDashboardStore.getState().updateFilter("1", { value: "Database" });

      const { filters } = useDashboardStore.getState();
      expect(filters[0].value).toBe("Database");
    });
  });

  describe("View Management", () => {
    it("should save a new view", () => {
      const viewData = {
        name: "Test View",
        description: "A test view",
        filters: [],
        dateRange: {
          start: new Date("2024-01-01"),
          end: new Date("2024-01-31"),
        },
        chartType: "line" as const,
      };

      useDashboardStore.getState().saveView(viewData);
      const { savedViews } = useDashboardStore.getState();

      expect(savedViews).toHaveLength(1);
      expect(savedViews[0].name).toBe("Test View");
      expect(savedViews[0].id).toBeDefined();
    });

    it("should load a view", () => {
      const viewData = {
        name: "Test View",
        description: "A test view",
        filters: [
          {
            id: "1",
            field: "category" as const,
            operator: "equals" as const,
            value: "API",
          },
        ],
        dateRange: {
          start: new Date("2024-01-01"),
          end: new Date("2024-01-31"),
        },
        chartType: "line" as const,
      };

      useDashboardStore.getState().saveView(viewData);
      const { savedViews } = useDashboardStore.getState();

      useDashboardStore.getState().loadView(savedViews[0].id);
      const { selectedView, filters } = useDashboardStore.getState();

      expect(selectedView?.name).toBe("Test View");
      expect(filters).toHaveLength(1);
    });

    it("should delete a view", () => {
      const viewData = {
        name: "Test View",
        description: "A test view",
        filters: [],
        dateRange: {
          start: new Date("2024-01-01"),
          end: new Date("2024-01-31"),
        },
        chartType: "line" as const,
      };

      useDashboardStore.getState().saveView(viewData);
      const { savedViews } = useDashboardStore.getState();

      useDashboardStore.getState().deleteView(savedViews[0].id);
      const updatedState = useDashboardStore.getState();

      expect(updatedState.savedViews).toHaveLength(0);
    });
  });

  describe("State Updates", () => {
    it("should set loading state", () => {
      useDashboardStore.getState().setLoading(true);
      expect(useDashboardStore.getState().isLoading).toBe(true);

      useDashboardStore.getState().setLoading(false);
      expect(useDashboardStore.getState().isLoading).toBe(false);
    });

    it("should set error state", () => {
      const errorMessage = "Test error";
      useDashboardStore.getState().setError(errorMessage);
      expect(useDashboardStore.getState().error).toBe(errorMessage);

      useDashboardStore.getState().setError(null);
      expect(useDashboardStore.getState().error).toBeNull();
    });
  });
});
