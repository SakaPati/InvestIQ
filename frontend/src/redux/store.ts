import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user";
import transactionsReducer from "./slices/transaction";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const storage = {
  getItem(key: string) {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const userPersistConfig = {
  key: "user",
  storage,
};

const persistedUserReducer = persistReducer(
  userPersistConfig,
  userSlice.reducer
);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    transactions: transactionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;