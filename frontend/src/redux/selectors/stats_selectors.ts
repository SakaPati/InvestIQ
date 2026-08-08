import { createSelector } from "@reduxjs/toolkit";
import { expenseSelectors, incomeSelectors } from "../slices/transaction";

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

export type LastSixMonthsExpense = {
  year: number;
  month: (typeof months)[number];
  sum: number;
};

const selectCurrentMonth = () => {
  const now = new Date();

  return `${now.getFullYear()}-${now.getMonth()}`;
};

export const selectLastSixMonthsExpenses = createSelector(
  [expenseSelectors.selectAll, selectCurrentMonth],
  (expenses): LastSixMonthsExpense[] => {
    const now = new Date();

    const result = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - (5 - index),
        1,
      );

      return {
        year: date.getFullYear(),
        month: months[date.getMonth()],
        sum: 0,
      };
    });

    expenses.forEach((expense) => {
      const date = new Date(expense.date);

      if (Number.isNaN(date.getTime())) {
        return;
      }

      const item = result.find(
        (month) =>
          month.year === date.getFullYear() &&
          month.month === months[date.getMonth()],
      );

      if (item) {
        item.sum += expense.sum;
      }
    });

    return result;
  },
);

export const selectLastSixMonthsIncomes = createSelector(
  [incomeSelectors.selectAll, selectCurrentMonth],
  (incomes): LastSixMonthsExpense[] => {
    const now = new Date();

    const result = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - (5 - index),
        1,
      );

      return {
        year: date.getFullYear(),
        month: months[date.getMonth()],
        sum: 0,
      };
    });

    incomes.forEach((income) => {
      const date = new Date(income.date);

      if (Number.isNaN(date.getTime())) return;
      
      const item = result.find(
        (month) =>
          month.year === date.getFullYear() &&
          month.month === months[date.getMonth()],
      );

      if (item) item.sum += income.sum;
    });

    return result;
  },
);