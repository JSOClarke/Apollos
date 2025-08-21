import { Sankey, ResponsiveContainer, Tooltip } from "recharts";
import type {
  YearlyProjection,
  SankeyLink,
  SankeyNode,
} from "../../types/types";
import type { SankeyData } from "recharts/types/chart/Sankey";

interface SankeyRechartProps {
  yearlyProjectionData: YearlyProjection[];
  yearSelected: number;
}

export default function SankeyRechart({
  yearlyProjectionData,
  yearSelected,
}: SankeyRechartProps) {
  const filteredYearProjectionData: YearlyProjection | null =
    yearlyProjectionData.find((yearData) => yearData.year == yearSelected) ||
    null;
  const links: SankeyLink[] = [];

  if (!filteredYearProjectionData) {
    return <div>No data for selected year</div>;
  }
  const nodeNames = [
    ...filteredYearProjectionData.incomeBreakdown.map(
      (i) => `Income: ${i.name}`
    ),
    "Cash Balance",
    "Expenses",

    ...filteredYearProjectionData.expenseBreakdown.map(
      (e) => `Expense: ${e.name}`
    ),
    ...filteredYearProjectionData.assets.map((a) => `Asset: ${a.name}`),
    "Surplus",
    "Deficit",
    "Transfers",
  ];
  const nodes = nodeNames.map((name) => ({ name }));
  console.log(nodes);
  filteredYearProjectionData.expenseBreakdown.forEach((exp) => {
    const sourceIndex = nodeNames.indexOf("Cash Balance");
    const targetIndex1 = nodeNames.indexOf("Expenses");
    const targetIndex2 = nodeNames.indexOf(`Expense: ${exp.name}`); // or Asset depending on logic

    links.push({
      source: sourceIndex,
      target: targetIndex1,
      value: exp.amount,
    });
    links.push({
      source: targetIndex1,
      target: targetIndex2,
      value: exp.amount,
    });
  });

  filteredYearProjectionData.incomeBreakdown.forEach((inc) => {
    const sourceIndex = nodeNames.indexOf(`Income: ${inc.name}`);
    const targetIndex1 = nodeNames.indexOf("Cash Balance");

    links.push({
      source: sourceIndex,
      target: targetIndex1,
      value: inc.amount,
    });
  });

  filteredYearProjectionData.surplusHistory.forEach((surp) => {
    const sourceIndex = nodeNames.indexOf("Cash Balance");
    const targetIndex = nodeNames.indexOf(
      `Asset: ${
        filteredYearProjectionData.assets.find((a) => a.id === surp.assetId)
          ?.name
      }`
    );
    const middleIndex = nodeNames.indexOf("Transfers");
    links.push({
      source: sourceIndex,
      target: middleIndex,
      value: surp.amount,
    });
    links.push({
      source: middleIndex,
      target: targetIndex,
      value: surp.amount,
    });
  });

  filteredYearProjectionData.passiveIncomesHistory.forEach((p) => {
    const sourceIndex = nodeNames.indexOf(
      `Asset: ${
        filteredYearProjectionData.assets.find((a) => a.id === p.fromAssetId)
          ?.name
      }`
    );
    const targetIndex1 = nodeNames.indexOf("Cash Balance");

    links.push({
      source: sourceIndex,
      target: targetIndex1,
      value: p.amount,
    });

    const targetIndex3 = nodeNames.indexOf(
      `Asset: ${
        filteredYearProjectionData.assets.find((a) => a.id === p.toAssetId)
          ?.name
      }`
    );

    const targetIndex2 = nodeNames.indexOf("Transfers");
    links.push({
      source: targetIndex1,
      target: targetIndex2,
      value: p.amount,
    });
    links.push({
      source: targetIndex2,
      target: targetIndex3,
      value: p.amount,
    });
  });

  console.log("nodeNames", nodeNames);
  console.log("Links", links);

  const sankeyData: SankeyData = { nodes, links };
  return (
    <div>
      <ResponsiveContainer width={"100%"} height={1000}>
        <Sankey data={sankeyData} nodePadding={50} nodeWidth={20}>
          <Tooltip />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
}
