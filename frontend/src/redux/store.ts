import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slices/user'
import transactionsReducer from "./slices/transaction";
import { monthSlice } from './slices/monthSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    transactions: transactionsReducer,
    monthCalendar: monthSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;