import type { TooltipContentProps } from "recharts";
import type { FlattenedYearlyProjection } from "../../types/types";
import { chartConstants } from "../../constants/chartConstants";

const TOOLTIPOPT = [
  {
    key: "totalIncome",
    label: "Total Income",
    color: "red",
  },
  {
    key: "totalExpenses",
    label: "Total Expenses",
    color: "blue",
  },
  {
    key: "totalAssets",
    label: "Total Assets",
    color: "purple",
  },
  {
    key: "milestones",
    label: "Milestones",
    color: "orange",
  },
];

export default function CustomChartToolTip({
  active,
  payload,
  label,
}: TooltipContentProps<number, string>) {
  if (!active || !payload || !label) return null;

  const yearPayload: FlattenedYearlyProjection = payload[0].payload;

  return (
    <div className="bg-white p-2 rounded-lg shadow-md">
      <p className="font-semibold">{label}</p>

      {chartConstants.map((opt) => {
        const value = yearPayload[opt.key as keyof FlattenedYearlyProjection];
        if (!value) return null;

        if (Array.isArray(value)) {
          if (value.length === 0) return null;
          return (
            <div key={opt.key} className="mb-2">
              <p style={{ color: opt.color }}>{opt.label}:</p>
              <ul className="ml-2">
                {value.map((item, i) => (
                  <li key={i}>
                    {typeof item === "object" &&
                      `${item.name ? item.name : "none"}`}
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return (
          <p key={opt.key} style={{ color: opt.color }}>
            {opt.label}: £
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        );
      })}
    </div>
  );
}
