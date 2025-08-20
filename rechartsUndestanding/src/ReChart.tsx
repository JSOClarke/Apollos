import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  type TooltipContentProps,
} from "recharts";

import CustomChartToolTip from "./components/customToolTip/CustomChartToolTip";
import { chartConstants } from "./constants/chartConstants";

import { yearlyProjection } from "./data/mockData";
import type {
  YearlyProjection,
  FlattenedYearlyProjection,
} from "./types/types";

export default function ReChart() {
  const barRadius: [number, number, number, number] = [5, 5, 0, 0];

  const flattenedData: FlattenedYearlyProjection[] = yearlyProjection.map(
    (y) => ({
      year: y.year,
      totalIncome: y.incomeBreakdown.reduce((sum, i) => sum + i.amount, 0),
      totalExpenses: y.expenseBreakdown.reduce((sum, i) => sum + i.amount, 0),
      totalAssets: y.assets.reduce((sum, i) => sum + i.amount, 0),
      totalLiabilities: y.liabilities.reduce((sum, i) => sum + i.amount, 0),
      milestones: y.milestones,
    })
  );

  return (
    <div className=" bg-white rounded-xl p-2">
      <BarChart width={1000} height={500} data={flattenedData} barGap={0}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />

        <Tooltip
          content={(props: TooltipContentProps<number, string>) => (
            <CustomChartToolTip {...props} />
          )}
        />

        <Bar
          dataKey="totalAssets"
          fill={chartConstants[2].color}
          barSize={30}
          stackId={"a"}
        />
        <Bar
          dataKey="totalExpenses"
          radius={barRadius}
          fill={chartConstants[1].color}
          barSize={30}
          stackId={"a"}
        />
      </BarChart>
    </div>
  );
}
