import { createSlice } from "@reduxjs/toolkit";

export const cusAuthSlice = createSlice({
  name: "cusAuth",
  initialState: {
    user: null,
    token: JSON.parse(localStorage.getItem("token")) || null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});
export const { login, logout } = cusAuthSlice.actions;
export const selectCus = (state) => state.cusAuth.token;
export default cusAuthSlice.reducer;
