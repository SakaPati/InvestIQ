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

type Transaction = {
  name: string;
  value: number;
  // date: string;
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

type Years =
  | 2020
  | 2021
  | 2022
  | 2023
  | 2024
  | 2025
  | 2026
  | 2027
  | 2028
  | 2029
  | 2030;

export type CategoriesByPeriod = Record<Years, Record<Month, Categories>>;

const createCategories = (): Categories => ({
  Products: { transactions: [], total: 0 },
  Alcohol: { transactions: [], total: 0 },
  Fun: { transactions: [], total: 0 },
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

const createMonth = (): Record<Month, Categories> => ({
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
});

const createYear = (): CategoriesByPeriod => ({
  2020: createMonth(),
  2021: createMonth(),
  2022: createMonth(),
  2023: createMonth(),
  2024: createMonth(),
  2025: createMonth(),
  2026: createMonth(),
  2027: createMonth(),
  2028: createMonth(),
  2029: createMonth(),
  2030: createMonth(),
});

export type ReturnedCategoryData = Record<Category, CategoryData>;

export const selectExpenseCategory = createSelector(
  [expenseSelectors.selectAll],
  (expenses): CategoriesByPeriod => {
    return expenses.reduce<CategoriesByPeriod>((acc, transaction) => {
      const date = new Date(transaction.date);

      const year = new Date(transaction.date).getFullYear() as Years;
      const month = months[date.getMonth()];
      const category = transaction.category as keyof Categories;

      acc[year][month][category].transactions.push({
        name: transaction.title,
        value: transaction.sum,
        category,
      });

      acc[year][month][category].total += transaction.sum;

      return acc;
    }, createYear());
  },
);
