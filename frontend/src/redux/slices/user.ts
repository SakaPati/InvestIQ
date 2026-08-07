import { createSlice } from "@reduxjs/toolkit";

export interface State {
  username: null | string;
  avatar: null | string;
  email: null | string;
  isLoggedIn: boolean;
  // token: null | string; ///// ЩО З ТОКЕНОМ????
}

export type RootState = {
  user: State
}

const initialState: State = {
  username: null,
  avatar: null,
  email: null,
  isLoggedIn: false,
  // token: null,
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
      // state.token = action.payload.token;
    },
    logout: (state) => {
      state.username = null;
      state.avatar = null;
      state.email = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions

export default userSlice.reducer;

export const selectUsername = (state: RootState): string | null => state.user.username;
export const selectEmail = (state: RootState): string | null => state.user.email;
export const selectIsLoggedIn = (state: RootState): boolean => state.user.isLoggedIn;
export const selectAvatar = (state: RootState): string | null => state.user.avatar;

