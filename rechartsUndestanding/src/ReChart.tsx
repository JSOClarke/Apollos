import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipContentProps,
} from "recharts";

import CustomChartToolTip from "./components/customToolTip/CustomChartToolTip";
import { chartConstants } from "./constants/chartConstants";

import { yearlyProjection } from "./data/mockData";
import type {
  YearlyProjection,
  FlattenedYearlyProjection,
} from "./types/types";

interface ReChartProps {
  yearlyProjectionData: YearlyProjection[];
}

export default function ReChart({ yearlyProjectionData }: ReChartProps) {
  const barRadius: [number, number, number, number] = [5, 5, 0, 0];

  console.log("chartData", yearlyProjectionData);

  const flattenedData: FlattenedYearlyProjection[] = yearlyProjectionData.map(
    (y: YearlyProjection) => ({
      year: y.year,
      totalIncome: y.incomeBreakdown.reduce((sum, i) => sum + i.amount, 0),
      totalExpenses: y.expenseBreakdown.reduce((sum, i) => sum + i.amount, 0),
      totalAssets: y.assets.reduce((sum, i) => sum + i.amount, 0),
      totalLiabilities: y.liabilities.reduce((sum, i) => sum + i.amount, 0),
      totalPassiveIncome: y.passiveIncomesHistory.reduce(
        (sum, i) => sum + i.amount,
        0
      ),
      milestones: y.milestones,
    })
  );

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <BarChart
        data={flattenedData}
        barGap={0}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis
          width={100}
          tickFormatter={(value: number) => `£${value.toLocaleString("en-GB")}`}
        />

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
          dataKey="totalPassiveIncome"
          radius={barRadius}
          fill={chartConstants[1].color}
          barSize={30}
          stackId={"a"}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
