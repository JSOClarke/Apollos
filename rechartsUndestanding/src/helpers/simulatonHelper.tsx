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

  // Fraction of first year remaining
  const monthsRemaining = 12 - startMonth;
  const fractionFirstYear = monthsRemaining / 12;

  let yearCounter = 0;

  // Partial first year if starting mid-year
  if (fractionFirstYear < 1) {
    const result = yearByYear(currentBaseline, startYear, fractionFirstYear);

    projections.push({
      year: startYear,
      incomeBreakdown: structuredClone(result.activeIncomes),
      expenseBreakdown: structuredClone(result.activeExpenses),
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
  const fullYears = Math.floor(totalYears - fractionFirstYear);
  for (let i = 0; i < fullYears; i++) {
    const year = startYear + yearCounter;
    const result = yearByYear(currentBaseline, year, 1);

    projections.push({
      year,
      incomeBreakdown: structuredClone(result.activeIncomes),
      expenseBreakdown: structuredClone(result.activeExpenses),
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

  // Partial last year if totalYears is not an integer
  const fractionLastYear = totalYears % 1;
  if (fractionLastYear > 0) {
    const year = startYear + yearCounter;
    const result = yearByYear(currentBaseline, year, fractionLastYear);

    projections.push({
      year,
      incomeBreakdown: structuredClone(result.activeIncomes),
      expenseBreakdown: structuredClone(result.activeExpenses),
      assets: structuredClone(result.updatedAssets),
      liabilities: structuredClone(result.updatedLiabilities),
      contributionsHistory: structuredClone(result.contributionsHistory),
      passiveIncomesHistory: structuredClone(result.passiveIncomesHistory),
      withdrawalHistory: structuredClone(result.withdrawalsHistory),
      surplusHistory: structuredClone(result.surplusesHistory),
      growthHistory: structuredClone(result.growthHistory),
    });
  }

  return projections;
}
