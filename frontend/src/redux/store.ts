import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";
import transactionsReducer from "./slices/transaction";
import { monthSlice } from './slices/monthSlice';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import pkgStorage from "redux-persist/lib/storage"

const storageModule = pkgStorage as unknown as Record<string, Storage>;
const storage: Storage = storageModule.default && typeof storageModule.default === 'object'
  ? storageModule.default 
  : (pkgStorage as unknown as Storage);

const persistConfig = {
  key: 'root',
  storage,
};

const persistedTransactionsReducer = persistReducer(
  persistConfig,
  transactionsReducer
);

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    transactions: persistedTransactionsReducer,
    monthCalendar: monthSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);