import type {
  BaseLineConditions,
  WithdrawlHistory,
  PassiveIncomeHistory,
  SurplusHistory,
  DeficitHistory,
  GrowthHistory,
  ContributionHistory,
  LiabilityPaymentHistory,
} from "../types/types";
import { surplusPriority, deficitPriority } from "../data/mockData";

export function yearByYear(
  baseLineConditions: BaseLineConditions,
  currentYear: number,
  fractionOfYear = 1 // defaults to a full year
) {
  const { incomes, expenses, assets, liabilities } = baseLineConditions;

  // 0️⃣ Filter incomes/expenses active this year
  const activeIncomes = incomes.filter(
    (i) => currentYear >= i.startYear && currentYear <= i.endYear
  );
  const activeExpenses = expenses.filter(
    (e) => currentYear >= e.startYear && currentYear <= e.endYear
  );

  let updatedAssets = [...assets];
  let updatedLiabilities = [...liabilities];

  let contributionsHistory: ContributionHistory[] = [];
  let passiveIncomesHistory: PassiveIncomeHistory[] = [];
  let withdrawalsHistory: WithdrawlHistory[] = [];
  let surplusesHistory: SurplusHistory[] = [];
  let deficitsHistory: DeficitHistory[] = [];
  let growthHistory: GrowthHistory[] = [];
  let liabilityPaymentsHistory: LiabilityPaymentHistory[] = [];

  // 1️⃣ Scale total income and expenses by fraction
  const totalIncome = activeIncomes.reduce(
    (sum, i) => sum + i.amount * fractionOfYear,
    0
  );
  const totalExpenses = activeExpenses.reduce(
    (sum, i) => sum + i.amount * fractionOfYear,
    0
  );
  let netCashflow = totalIncome - totalExpenses;
  let remainingCashFlow = netCashflow;

  // 1.5️⃣ Apply liabilities (interest + repayments)
  for (let i = 0; i < updatedLiabilities.length; i++) {
    let liab = updatedLiabilities[i];

    const interest = liab.amount * ((liab.interestRate ?? 0) * fractionOfYear);
    liab.amount += interest;

    let repayment = Math.min(
      (liab.annualRepayment ?? 0) * fractionOfYear,
      liab.amount
    );

    if (repayment > remainingCashFlow) {
      repayment = Math.max(0, remainingCashFlow);
    }

    liab.amount -= repayment;
    remainingCashFlow -= repayment;

    updatedLiabilities[i] = { ...liab };
    liabilityPaymentsHistory.push({
      liabilityId: liab.id,
      interest,
      repayment,
      remainingBalance: liab.amount,
    });
  }

  // 2️⃣ Apply contributions scaled by fraction
  for (const asset of updatedAssets) {
    if (!asset.intendedMonthlyContribution || remainingCashFlow <= 0) continue;

    const annualContribution = Math.min(
      asset.intendedMonthlyContribution * 12 * fractionOfYear,
      remainingCashFlow
    );

    const index = updatedAssets.findIndex((a) => a.id === asset.id);
    updatedAssets[index] = {
      ...updatedAssets[index],
      amount: updatedAssets[index].amount + annualContribution,
    };

    contributionsHistory.push({
      assetId: asset.id,
      amount: annualContribution,
    });
    remainingCashFlow -= annualContribution;
  }

  // 3️⃣ Apply growth scaled by fraction
  for (let i = 0; i < updatedAssets.length; i++) {
    if (!updatedAssets[i].growthRate) continue;
    const growthAmount =
      updatedAssets[i].amount * updatedAssets[i].growthRate * fractionOfYear;
    updatedAssets[i].amount += growthAmount;
    growthHistory.push({ assetId: updatedAssets[i].id, amount: growthAmount });
  }

  // 4️⃣ Passive income scaled by fraction
  for (let i = 0; i < updatedAssets.length; i++) {
    const asset = updatedAssets[i];
    if (!asset.yieldRate) continue;

    const fromAsset = asset.id;
    const passiveIncomeValue = asset.amount * asset.yieldRate * fractionOfYear;

    for (const sp of surplusPriority) {
      const index = updatedAssets.findIndex((a) => a.id === sp.assetId);
      if (index === -1) continue;

      updatedAssets[index] = {
        ...updatedAssets[index],
        amount: updatedAssets[index].amount + passiveIncomeValue,
      };
      passiveIncomesHistory.push({
        fromAssetId: fromAsset,
        toAssetId: updatedAssets[index].id,
        amount: passiveIncomeValue,
      });

      break;
    }
  }

  // 5️⃣ Surplus
  if (remainingCashFlow > 0) {
    for (const sp of surplusPriority) {
      const index = updatedAssets.findIndex((a) => a.id === sp.assetId);
      if (index === -1) continue;

      updatedAssets[index] = {
        ...updatedAssets[index],
        amount: updatedAssets[index].amount + remainingCashFlow,
      };

      surplusesHistory.push({
        assetId: updatedAssets[index].id,
        amount: remainingCashFlow,
      });

      remainingCashFlow = 0;
      break;
    }
  }

  // 6️⃣ Deficit
  if (remainingCashFlow < 0) {
    let deficit = Math.abs(remainingCashFlow);
    for (const dp of deficitPriority) {
      const index = updatedAssets.findIndex((a) => a.id === dp.assetId);
      if (index === -1 || deficit <= 0) continue;

      const deduction = Math.min(deficit, updatedAssets[index].amount);
      updatedAssets[index] = {
        ...updatedAssets[index],
        amount: updatedAssets[index].amount - deduction,
      };

      withdrawalsHistory.push({
        assetId: updatedAssets[index].id,
        amount: deduction,
      });

      deficit -= deduction;
    }

    remainingCashFlow = -deficit;
  }

  return {
    updatedAssets,
    updatedLiabilities,
    liabilityPaymentsHistory,
    passiveIncomesHistory,
    contributionsHistory,
    withdrawalsHistory,
    netCashflow,
    surplusesHistory,
    growthHistory,
    remainingCashFlow,
    activeIncomes,
    activeExpenses,
  };
}
