import type { Category } from "@/components/Income/Income";
import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export interface Transaction {
  id: string;
  // date: string; // Date
  title: string;
category: Category;  sum: number;
}

const expenseAdapter = createEntityAdapter<Transaction>(); // витрати

const incomeAdapter = createEntityAdapter<Transaction>(); // доходи

const initialState = {
  expenses: expenseAdapter.getInitialState(),
  income: incomeAdapter.getInitialState(),
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Transaction>) => {
      expenseAdapter.addOne(state.expenses, action.payload);
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      expenseAdapter.removeOne(state.expenses, action.payload);
    },
    addIncome: (state, action: PayloadAction<Transaction>) => {
      incomeAdapter.addOne(state.income, action.payload);
    },
    removeIncome: (state, action: PayloadAction<string>) => {
      incomeAdapter.removeOne(state.income, action.payload);
    },
  },
});

export const { addExpense, addIncome, removeExpense, removeIncome } =
  transactionsSlice.actions;

export type TransactionsState = typeof initialState;
export interface RootState {
  transactions: TransactionsState;
}
export const incomeSelectors = incomeAdapter.getSelectors<RootState>(
  (state) => state.transactions.income,
);
export const expenseSelectors = expenseAdapter.getSelectors<RootState>(
  (state) => state.transactions.expenses,
);

export default transactionsSlice.reducer;
