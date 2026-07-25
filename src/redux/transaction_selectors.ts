import { createSelector } from "@reduxjs/toolkit";
import { incomeSelectors, expenseSelectors } from "./slices/transaction";
import type { Category } from "@/components/Income/Income";

export interface ReturnedData {
  sum: number;
}

export interface ReturnedCategorySumData {
  products: number,
  alcohol: number,
  fun: number,
  health: number,
  transport: number,
  home: number,
  technic: number,
  bills: number,
  hobby: number,
  learn: number,
  other: number,
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
  name: string,
  value: number
}

export type ReturnedCategoryData = Record<Category, CategoryData>;
export const selectExpenseCategory = createSelector(
  [expenseSelectors.selectAll],
  (expenses): ReturnedCategoryData => {
    return expenses.reduce<ReturnedCategoryData>(
      (acc, expense) => {
        acc[expense.category].transactions.push({
          name: expense.title,
          value: expense.sum
        })
        acc[expense.category].total += expense.sum

        return acc
      },
      {
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
      },
    )
  }
);

