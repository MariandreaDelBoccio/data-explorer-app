import type { MetricData } from "../types";

export const FILTER_FIELDS: Array<{ value: keyof MetricData; label: string }> = [
  { value: "category", label: "Category" },
  { value: "status", label: "Status" },
  { value: "value", label: "Value" },
];

export const OPERATORS = [
  { value: "equals", label: "Equals" },
  { value: "contains", label: "Contains" },
  { value: "greaterThan", label: "Greater Than" },
  { value: "lessThan", label: "Less Than" },
] as const;