import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  username: null | string;
  avatar: null | string;
  email: null | string;
  isLoggedIn: boolean;
  // token: null | string;
}

const initialState: CounterState = {
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
