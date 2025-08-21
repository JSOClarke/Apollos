import type {
  BaseLineConditions,
  YearlyProjection,
  Priority,
  UserInformation,
  Milestone,
} from "../types/types";

export const baseLineConditions: BaseLineConditions = {
  incomes: [
    {
      name: "Salary",
      amount: 14000,
      frequency: "annual",
      id: 1,
      startYear: 2025,
      endYear: 2065,
    },
  ],
  expenses: [
    {
      name: "Rent",
      amount: 10000,
      frequency: "annual",
      id: 1,
      startYear: 2025,
      endYear: 2065,
    },
    {
      name: "Holiday",
      amount: 1000,
      frequency: "annual",
      id: 2,
      startYear: 2025,
      endYear: 2062,
    },
  ],
  assets: [
    {
      name: "Stocks",
      amount: 30000,
      type: "investment",
      growthRate: 0.07,
      id: 1,
    },
    { name: "Savings", amount: 30000, type: "cash", id: 2, yieldRate: 0.02 },
  ],
  liabilities: [
    {
      name: "Mortgage",
      amount: 0,
      type: "loan",
      interestRate: 0,
      id: 1,
      annualRepayment: 0,
    },
  ],
};

export const deficitPriority: Priority[] = [{ assetId: 2 }, { assetId: 1 }]; // savings first then stocks
export const surplusPriority: Priority[] = [{ assetId: 1 }, { assetId: 2 }]; // stocks first then savings

export const userInformation: UserInformation = {
  name: "Jordan Clarke",
  dob: new Date("2000-05-02"),
};

export type Milestone = {
  id: number;
  name: string;
  year: number;
  description?: string;
};

export const milestones: Milestone[] = [
  {
    id: 1,
    name: "made it nigga",
    year: 2040,
    description: "You a bum tho so dont pipe up",
  },
];
