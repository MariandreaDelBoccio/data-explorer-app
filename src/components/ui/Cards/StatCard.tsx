import { Card } from "./Card";
import type { StatCardProps } from "./types";

export function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p
              className={`text-sm mt-2 ${
                change.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {change.isPositive ? "↑" : "↓"} {Math.abs(change.value)}%
            </p>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">{icon}</div>
        )}
      </div>
    </Card>
  );
}
