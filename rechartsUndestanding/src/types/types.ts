// Income source
export type Incomes = {
  id: number;
  name: string;
  amount: number;
  frequency: "monthly" | "annual";
};

// Expense category
export type Expenses = {
  id: number;
  name: string;
  amount: number;
  frequency: "monthly" | "annual";
};

export type Priority = {
  assetId: number;
};

export type ContributionHistory = {
  assetId: number;
  amount: number;
};

export type GrowthHistory = {
  assetId: number;
  amount: number;
};

export type DeficitHistory = {
  assetId: number;
  amount: number;
};
export type SurplusHistory = {
  assetId: number;
  amount: number;
};
// Asset
export type Asset = {
  id: number;
  name: string;
  amount: number;
  type: "investment" | "property" | "cash";
  yieldRate?: number;
  growthRate?: number; // optional yearly growth rate
  intendedMonthlyContribution?: number;
};

// Liability Not currently needed
export type Liability = {
  id: number;
  name: string;
  amount: number;
  type?: "loan" | "credit";
  interestRate?: number;
  annualRepayment: number;
};

export type LiabilityPaymentHistory = {
  liabilityId: number;
  interest: number;
  repayment: number;
  remainingBalance: number;
};

// Optional milestones or events
export type Milestone = {
  id: number;
  name: string;
  year: number;
  description?: string;
};

export type WithdrawlHistory = {
  assetId: number;
  amount: number;
};

export type PassiveIncomeHistory = {
  fromAssetId: number;
  toAssetId: number;
  amount: number;
};

// Yearly projection data
export type YearlyProjection = {
  year: number;
  incomeBreakdown: Incomes[];
  expenseBreakdown: Expenses[];
  assets: Asset[];
  liabilities: Liability[];
  milestones?: Milestone[];
  withdrawalHistory: WithdrawlHistory[];
  passiveIncomesHistory: PassiveIncomeHistory[];
  contributionsHistory: ContributionHistory[];
  surplusHistory: SurplusHistory[];
  growthHistory: GrowthHistory[];
};
// The shape of your flattened yearly projection
export interface FlattenedYearlyProjection {
  year: number;
  totalIncome: number;
  totalExpenses: number;
  totalAssets: number;
  totalLiabilities: number;
  milestones?: Milestone[];
  totalPassiveIncome: number;
}

export interface BaseLineConditions {
  assets: Asset[];
  liabilities: Liability[];
  incomes: Incomes[];
  expenses: Expenses[];
}

export interface UserInformation {
  dob: Date;
  name: string;
}
export interface SankeyNode {
  name: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  color?: string;
}

export interface SankeyLink {
  source: number | SankeyNode;
  target: number | SankeyNode;
  value: number;
  color?: string;
}
