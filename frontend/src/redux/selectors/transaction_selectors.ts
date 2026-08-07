import { createSelector } from "@reduxjs/toolkit";
import { incomeSelectors, expenseSelectors } from "../slices/transaction";
import type { Category } from "@/components/Income/Income";

export type SumByPeriod = Record<Years, Record<Month, Sum>>;

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

export type Month = (typeof months)[number];

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


type Sum = {
  sum: number
};

const createSum = (): Sum => ({
  sum: 0
});

const createM = (): Record<Month, Sum> => ({
  January: createSum(),
  February: createSum(),
  March: createSum(),
  April: createSum(),
  May: createSum(),
  June: createSum(),
  July: createSum(),
  August: createSum(),
  September: createSum(),
  October: createSum(),
  November: createSum(),
  December: createSum(),
});

const createY = (): SumByPeriod => ({
  2020: createM(),
  2021: createM(),
  2022: createM(),
  2023: createM(),
  2024: createM(),
  2025: createM(),
  2026: createM(),
  2027: createM(),
  2028: createM(),
  2029: createM(),
  2030: createM(),
});

// сума доходів
export const selectTotalIncomeSum = createSelector(
  [incomeSelectors.selectAll],
  (incomes): SumByPeriod => {
    return incomes.reduce(
      (total, income) => {
        const date = new Date(income.date);
        const year = date.getFullYear() as Years;
        const month = months[date.getMonth()];
        
        total[year][month].sum += income.sum
        return total;
      },
      createY()
    );
  },
);

// сума витрат
export const selectTotalExpenseSum = createSelector(
  [expenseSelectors.selectAll],
  (expenses): SumByPeriod => {
    return expenses.reduce(
      (total, expense) => {
       const date = new Date(expense.date);

      const year = date.getFullYear() as Years;
      const month = months[date.getMonth()];

      total[year][month].sum += expense.sum;
        return total;
      },
      createY()
    );
  },
);



// types

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

export type Years =
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

const isYear = (year: number): year is Years => {
  return year >= 2020 && year <= 2030;
};

const isCategory = (category: string): category is keyof Categories => {
  return category in createCategories();
};

// graphs data + total sum of each category

export const selectExpenseCategory = createSelector(
  [expenseSelectors.selectAll],
  (expenses): CategoriesByPeriod => {
    return expenses.reduce<CategoriesByPeriod>((acc, transaction) => {
      const date = new Date(transaction.date);

      if (Number.isNaN(date.getTime())) {
        return acc;
      }

      const year = date.getFullYear();
      const month = months[date.getMonth()];
      const category = transaction.category;

      if (!isYear(year)) {
        return acc;
      }

      if (!month) {
        return acc;
      }

      if (!isCategory(category)) {
        return acc;
      }

      const categoryData = acc[year][month][category];

      categoryData.transactions.push({
        name: transaction.title,
        value: transaction.sum,
        category,
      });

      categoryData.total += transaction.sum;

      return acc;
    }, createYear());
  },
);

export const selectIncomeCategory = createSelector(
  [incomeSelectors.selectAll],
  (incomes): CategoriesByPeriod => {
    return incomes.reduce<CategoriesByPeriod>((acc, transaction) => {
      const date = new Date(transaction.date);

      if (Number.isNaN(date.getTime())) {
        return acc;
      }

      const year = date.getFullYear();
      const month = months[date.getMonth()];
      const category = transaction.category;

      if (!isYear(year)) {
        return acc;
      }

      if (!month) {
        return acc;
      }

      if (!isCategory(category)) {
        return acc;
      }

      const categoryData = acc[year][month][category];

      categoryData.transactions.push({
        name: transaction.title,
        value: transaction.sum,
        category,
      });

      categoryData.total += transaction.sum;

      return acc;
    }, createYear());
  },
);
