import { createSelector } from "@reduxjs/toolkit";
import { incomeSelectors, expenseSelectors } from "./slices/transaction";
import type { Category } from "@/components/Income/Income";

type Categories = {
  Products: CategoryData;
  Alcohol: CategoryData;
  Fun: CategoryData;
  Health: CategoryData;
  Transport: CategoryData;
  Home: CategoryData;
  Technic: CategoryData;
  Bills: CategoryData;
  Hobby: CategoryData;
  Learn: CategoryData;
  Other: CategoryData;
  Salary: CategoryData;
  Extra: CategoryData;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

type Month = (typeof months)[number];

const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027] as const;

export interface ReturnedData {
  sum: number;
}

export interface ReturnedCategorySumData {
  products: number;
  alcohol: number;
  fun: number;
  health: number;
  transport: number;
  home: number;
  technic: number;
  bills: number;
  hobby: number;
  learn: number;
  other: number;
}

// сума доходів
export const selectTotalIncomeSum = createSelector(
  [incomeSelectors.selectAll],
  (incomes): ReturnedData => {
    return incomes.reduce(
      (total, income) => {
        total.sum += income.sum;
        return total;
      },
      { sum: 0 },
    );
  },
);

// сума витрат
export const selectTotalExpenseSum = createSelector(
  [expenseSelectors.selectAll],
  (expenses): ReturnedData => {
    return expenses.reduce(
      (total, expense) => {
        total.sum += expense.sum;
        return total;
      },
      { sum: 0 },
    );
  },
);

export interface CategoryData {
  transactions: Transaction[];
  total: number;
}

export type Transaction = {
  name: string;
  value: number;
  category: string;
};

export interface ReturnedCategorySumData {
  products: number;
  alcohol: number;
  fun: number;
  health: number;
  transport: number;
  home: number;
  technic: number;
  bills: number;
  hobby: number;
  learn: number;
  other: number;
}

type Years = 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026 | 2027;

export type CategoriesByPeriod = Record<Years, Record<Month, Categories>>;

const createCategories = (): Categories => ({
  Products: {
    transactions: [],
    total: 0,
  },
  Alcohol: { transactions: [], total: 0 },
  Fun: {
    transactions: [], total: 0
  },
  // { name: "add", value: 234, category: "wfwer" },
  //     { name: "ssdfadd", value: 2324, category: "wfwer" },
  //     { name: "a22dd", value: 2134, category: "wfwer" }
  //   ,{name: "ad24d" , value: 1654 , category: "wfwer"}
  Health: { transactions: [], total: 0 },
  Transport: { transactions: [], total: 0 },
  Home: { transactions: [], total: 0 },
  Technic: { transactions: [], total: 0 },
  Bills: { transactions: [], total: 0 },
  Hobby: { transactions: [], total: 0 },
  Learn: { transactions: [], total: 0 },
  Other: { transactions: [], total: 0 },
  Salary: { transactions: [], total: 0 },
  Extra: { transactions: [], total: 0 },
});

const initialState = {
  January: createCategories(),
  February: createCategories(),
  March: createCategories(),
  April: createCategories(),
  May: createCategories(),
  June: createCategories(),
  July: createCategories(),
  August: createCategories(),
  September: createCategories(),
  October: createCategories(),
  November: createCategories(),
  December: createCategories(),
};

export type ReturnedCategoryData = Record<Category, CategoryData>;

export const selectExpenseCategory = createSelector(
  [expenseSelectors.selectAll],
  (expenses): CategoriesByPeriod => {
    return expenses.reduce<CategoriesByPeriod>(
      (acc, transaction) => {
        const year = years[new Date(transaction.date).getFullYear()];
        const month = months[new Date(transaction.date).getMonth()];
        acc[year][month][transaction.category].transactions.push({
          name: transaction.title,
          value: transaction.sum,
          category: transaction.category,
        });

        acc[year][month][transaction.category].total += transaction.sum;

        return acc;
      },
      {
        2020: initialState,
        2021: initialState,
        2022: initialState,
        2023: initialState,
        2024: initialState,
        2025: initialState,
        2026: initialState,
        2027: initialState,
      },
    );
  },
);
