import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipContentProps,
  ReferenceLine,
  ReferenceDot,
} from "recharts";

import CustomChartToolTip from "./components/customToolTip/CustomChartToolTip";
import { chartConstants } from "./constants/chartConstants";

// import { yearlyProjection } from "./data/mockData";
import { milestones } from "./data/mockData";
import type {
  YearlyProjection,
  FlattenedYearlyProjection,
  Milestone,
} from "./types/types";

interface ReChartProps {
  yearlyProjectionData: YearlyProjection[];
  setYearSelected: (year: number) => void;
  yearSelected: number;
}

export default function ReChart({
  yearlyProjectionData,
  setYearSelected,
  yearSelected,
}: ReChartProps) {
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

  const handleBarClick = (data: YearlyProjection) => {
    setYearSelected(data.year);
  };
  const maxY = Math.max(...flattenedData.map((d) => d.totalAssets));

  function findMaxYForYear(year: number) {
    const item = flattenedData.find((y) => y.year === year)?.totalAssets;
    console.log("item", item);
    const milestonePosition = item * 2;
    console.log("milestonePosition", milestonePosition);
    return milestonePosition; // or some fallback
  }

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <BarChart
        data={flattenedData}
        barGap={0}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <ReferenceLine x={yearSelected} strokeDasharray="3 3" stroke="red" />
        {milestones.map((stone) => {
          return (
            <ReferenceDot
              x={stone.year}
              y={findMaxYForYear(stone.year)}
              fill="blue"
              r={8}
            />
          );
        })}
        <ReferenceDot x={2070} y={findMaxYForYear(2070)} fill="red" r={8} />

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis
          width={100}
          tickFormatter={(value: number) => `£${value.toLocaleString("en-GB")}`}
        />

        <Tooltip
          cursor={false}
          content={(props: TooltipContentProps<number, string>) => (
            <CustomChartToolTip {...props} />
          )}
        />
        <Bar
          dataKey="totalAssets"
          fill={chartConstants[2].color}
          barSize={30}
          stackId={"a"}
          onClick={handleBarClick}
          cursor="pointer"
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
