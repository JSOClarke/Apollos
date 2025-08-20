// Income source
export type IncomeSource = {
  name: string;
  amount: number;
  frequency: "monthly" | "annual";
};

// Expense category
export type ExpenseCategory = {
  name: string;
  amount: number;
  frequency: "monthly" | "annual";
};

// Asset
export type Asset = {
  name: string;
  amount: number;
  type: "investment" | "property" | "cash";
  growthRate?: number; // optional yearly growth rate
};

// Liability Not currently needed
export type Liability = {
  name: string;
  amount: number;
  type?: "loan" | "credit";
  interestRate?: number;
};

// Optional milestones or events
export type Milestone = {
  name: string;
  year: number;
  description?: string;
};

// Yearly projection data
export type YearlyProjection = {
  year: number;
  incomeBreakdown: IncomeSource[];
  expenseBreakdown: ExpenseCategory[];
  assets: Asset[];
  liabilities: Liability[];
  milestones?: Milestone[];
};
// The shape of your flattened yearly projection
export interface FlattenedYearlyProjection {
  year: number;
  totalIncome: number;
  totalExpenses: number;
  totalAssets: number;
  totalLiabilities: number;
  milestones?: Milestone[];
}
