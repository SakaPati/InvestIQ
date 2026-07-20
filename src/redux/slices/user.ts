import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  // username: null | string;
  email: null | string;
  isLoggedIn: boolean;
  // token: null | string;
}

const initialState: CounterState = {
  // username: null,
  email: null,
  isLoggedIn: false,
  // token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      // state.username = action.payload.username;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      // state.token = action.payload.token;
    },
    logout: (state) => {
      // state.username = null;
      state.email = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions

export default userSlice.reducer;
