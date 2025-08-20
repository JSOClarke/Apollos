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

export function yearByYear(baseLineConditions: BaseLineConditions) {
  const { incomes, expenses, assets, liabilities } = baseLineConditions;

  let updatedAssets = [...assets];
  let updatedLiabilities = [...liabilities];

  let contributionsHistory: ContributionHistory[] = [];
  let passiveIncomesHistory: PassiveIncomeHistory[] = [];
  let withdrawalsHistory: WithdrawlHistory[] = [];
  let surplusesHistory: SurplusHistory[] = [];
  let deficitsHistory: DeficitHistory[] = [];
  let growthHistory: GrowthHistory[] = [];
  let liabilityPaymentsHistory: LiabilityPaymentHistory[] = [];

  // 1️⃣ Calculate yearly net cashflow
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, i) => sum + i.amount, 0);
  let netCashflow = totalIncome - totalExpenses;
  let remainingCashFlow = netCashflow;

  // 1.5️⃣ Apply liabilities (interest + repayments)
  for (let i = 0; i < updatedLiabilities.length; i++) {
    let liab = updatedLiabilities[i];

    // Interest accrual
    const interest = liab.amount * (liab.interestRate ?? 0);
    liab.amount += interest;

    // Scheduled repayment
    let repayment = Math.min(liab.annualRepayment ?? 0, liab.amount);

    // Check if cashflow covers repayment
    if (repayment > remainingCashFlow) {
      // partial repayment possible, rest becomes deficit later
      const available = Math.max(0, remainingCashFlow);
      repayment = available;
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

  // 2️⃣ Apply monthly contributions
  for (const asset of updatedAssets) {
    if (!asset.intendedMonthlyContribution || remainingCashFlow <= 0) continue;

    const annualContribution = Math.min(
      asset.intendedMonthlyContribution * 12,
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

  // 3️⃣ Apply capital growth (capital appreciation)
  for (let i = 0; i < updatedAssets.length; i++) {
    if (!updatedAssets[i].growthRate) continue;
    const growthAmount = updatedAssets[i].amount * updatedAssets[i].growthRate;
    updatedAssets[i].amount += growthAmount;
    growthHistory.push({ assetId: updatedAssets[i].id, amount: growthAmount });
  }

  // 4️⃣ Apply passive income (yield)
  for (let i = 0; i < updatedAssets.length; i++) {
    const asset = updatedAssets[i];
    if (!asset.yieldRate) continue;

    const passiveIncomeValue = asset.amount * asset.yieldRate;

    // Add passive income to first asset in surplusPriority (usually cash)
    for (const sp of surplusPriority) {
      const index = updatedAssets.findIndex((a) => a.id === sp.assetId);
      if (index === -1) continue;

      updatedAssets[index] = {
        ...updatedAssets[index],
        amount: updatedAssets[index].amount + passiveIncomeValue,
      };
      passiveIncomesHistory.push({
        assetId: updatedAssets[index].id,
        amount: passiveIncomeValue,
      });

      break; // passive income distributed once
    }
  }

  // 5️⃣ Handle surplus
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

  // 6️⃣ Handle deficit
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

    remainingCashFlow = -deficit; // if still negative
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
  };
}
