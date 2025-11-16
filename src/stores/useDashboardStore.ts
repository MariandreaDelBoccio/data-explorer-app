import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {
  DashboardStore,
  DateRange,
  SavedView,
} from "../types/index";

const initialDateRange: DateRange = {
  start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  end: new Date(),
};

export const useDashboardStore = create<DashboardStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        metrics: [],
        isLoading: false,
        error: null,
        filters: [],
        dateRange: initialDateRange,
        selectedView: null,
        savedViews: [],

        // Actions
        setMetrics: (metrics) => set({ metrics }),

        setLoading: (isLoading) => set({ isLoading }),

        setError: (error) => set({ error }),

        addFilter: (filter) =>
          set((state) => ({
            filters: [...state.filters, filter],
          })),

        removeFilter: (filterId) =>
          set((state) => ({
            filters: state.filters.filter((f) => f.id !== filterId),
          })),

        updateFilter: (filterId, updates) =>
          set((state) => ({
            filters: state.filters.map((f) =>
              f.id === filterId ? { ...f, ...updates } : f
            ),
          })),

        setDateRange: (dateRange) => set({ dateRange }),

        saveView: (viewData) => {
          const newView: SavedView = {
            ...viewData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set((state) => ({
            savedViews: [...state.savedViews, newView],
            selectedView: newView,
          }));
        },

        loadView: (viewId) => {
          const view = get().savedViews.find((v) => v.id === viewId);
          if (view) {
            set({
              selectedView: view,
              filters: view.filters,
              dateRange: view.dateRange,
            });
          }
        },

        deleteView: (viewId) =>
          set((state) => ({
            savedViews: state.savedViews.filter((v) => v.id !== viewId),
            selectedView:
              state.selectedView?.id === viewId ? null : state.selectedView,
          })),
      }),
      {
        name: "dashboard-storage",
        // Only persist certain keys
        partialize: (state) => ({
          savedViews: state.savedViews,
          filters: state.filters,
          dateRange: state.dateRange,
        }),
      }
    )
  )
);
