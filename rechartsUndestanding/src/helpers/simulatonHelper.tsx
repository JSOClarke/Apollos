import type { BaseLineConditions, YearlyProjection } from "../types/types";
import { yearByYear } from "./yearByYearProjection";

export function simulateYears(
  baseLineConditions: BaseLineConditions,
  totalYears: number,
  startDate: Date = new Date() // defaults to today
): YearlyProjection[] {
  const projections: YearlyProjection[] = [];
  let currentBaseline = structuredClone(baseLineConditions);

  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth(); // 0-indexed: Jan = 0

  // Calculate fraction of first year remaining
  const monthsRemaining = 12 - startMonth;
  const fractionOfYear = monthsRemaining / 12;

  let yearCounter = 1;

  // Partial first year if starting mid-year
  if (fractionOfYear < 1) {
    const result = yearByYear(currentBaseline, fractionOfYear);

    projections.push({
      year: startYear,
      incomeBreakdown: structuredClone(currentBaseline.incomes),
      expenseBreakdown: structuredClone(currentBaseline.expenses),
      assets: structuredClone(result.updatedAssets),
      liabilities: structuredClone(result.updatedLiabilities),
      contributionsHistory: structuredClone(result.contributionsHistory),
      passiveIncomesHistory: structuredClone(result.passiveIncomesHistory),
      withdrawalHistory: structuredClone(result.withdrawalsHistory),
      surplusHistory: structuredClone(result.surplusesHistory),
      growthHistory: structuredClone(result.growthHistory),
    });

    currentBaseline.assets = structuredClone(result.updatedAssets);
    currentBaseline.liabilities = structuredClone(result.updatedLiabilities);

    yearCounter++;
  }

  // Full years
  const remainingFullYears = Math.floor(totalYears - fractionOfYear);
  for (let i = 0; i < remainingFullYears; i++) {
    const result = yearByYear(currentBaseline, 1);

    projections.push({
      year: startYear + yearCounter - 1,
      incomeBreakdown: structuredClone(currentBaseline.incomes),
      expenseBreakdown: structuredClone(currentBaseline.expenses),
      assets: structuredClone(result.updatedAssets),
      liabilities: structuredClone(result.updatedLiabilities),
      contributionsHistory: structuredClone(result.contributionsHistory),
      passiveIncomesHistory: structuredClone(result.passiveIncomesHistory),
      withdrawalHistory: structuredClone(result.withdrawalsHistory),
      surplusHistory: structuredClone(result.surplusesHistory),
      growthHistory: structuredClone(result.growthHistory),
    });

    currentBaseline.assets = structuredClone(result.updatedAssets);
    currentBaseline.liabilities = structuredClone(result.updatedLiabilities);

    yearCounter++;
  }

  return projections;
}
