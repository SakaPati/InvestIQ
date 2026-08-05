import type { Category } from "@/components/Income/Income";
import {
  createEntityAdapter,
  createSlice} from "@reduxjs/toolkit";

export interface Transaction {
  id: string;
  date: string;
  title: string;
  category: Category;
  sum: number;
}

interface ChartData { 
  bigData: Transaction[]
}


const expenseAdapter = createEntityAdapter<Transaction>();

const incomeAdapter = createEntityAdapter<Transaction>();

const initialState = {
  expenses: expenseAdapter.getInitialState(),
  income: incomeAdapter.getInitialState(),
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      expenseAdapter.addOne(state.expenses, action.payload);
    },
    removeExpense: (state, action) => {
      expenseAdapter.removeOne(state.expenses, action.payload);
    },
    addIncome: (state, action) => {
      incomeAdapter.addOne(state.income, action.payload);
    },
    removeIncome: (state, action) => {
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
