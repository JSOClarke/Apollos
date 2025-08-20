import type { BaseLineConditions, YearlyProjection } from "../types/types";
import { yearByYear } from "./yearByYearProjection";

export function simulateYears(
  baseLineConditions: BaseLineConditions,
  totalYears: number
): YearlyProjection[] {
  const projections: YearlyProjection[] = [];

  // Start with a fresh copy of the baseline for year 1
  let currentBaseline = structuredClone(baseLineConditions);

  for (let year = 1; year <= totalYears; year++) {
    const result = yearByYear(currentBaseline);

    // Build the yearly projection
    const yearlyProjection: YearlyProjection = {
      year,
      incomeBreakdown: structuredClone(currentBaseline.incomes),
      expenseBreakdown: structuredClone(currentBaseline.expenses),
      assets: structuredClone(result.updatedAssets),
      liabilities: structuredClone(currentBaseline.liabilities),
      contributions: structuredClone(result.contributionsHistory),
      passiveIncomes: structuredClone(result.passiveIncomesHistory),
      withdrawls: structuredClone(result.withdrawalsHistory),
      // milestones can be added if needed
    };

    projections.push(yearlyProjection);

    // Update baseline for next year using updated asset values
    currentBaseline.assets = structuredClone(result.updatedAssets);

    // If liabilities are included, you would update them similarly
    currentBaseline.liabilities = structuredClone(currentBaseline.liabilities);
  }

  return projections;
}
