import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slices/user'
import transactionsReducer from "./slices/transaction";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;