import { createSlice } from "@reduxjs/toolkit";

export interface State {
  username: null | string;
  avatar: null | string;
  email: null | string;
  isLoggedIn: boolean;
  balance: null | number;
  token: null | string
}

export type RootState = {
  user: State
}

const initialState: State = {
  username: null,
  avatar: null,
  email: null,
  isLoggedIn: false,
  token: null,
  balance: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.balance = action.payload.balance;
    },
    logout: (state) => {
      state.username = null;
      state.avatar = null;
      state.email = null;
      state.isLoggedIn = false;
      state.token = null;
      state.balance = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

export const selectUsername = (state: RootState): string | null => state.user.username;
export const selectEmail = (state: RootState): string | null => state.user.email;
export const selectIsLoggedIn = (state: RootState): boolean => state.user.isLoggedIn;
export const selectAvatar = (state: RootState): string | null => state.user.avatar;
export const selectBalance = (state: RootState): number | null => state.user.balance;

