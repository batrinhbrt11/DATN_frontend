import { createSlice } from "@reduxjs/toolkit";

export const cusAuthSlice = createSlice({
  name: "cusAuth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || {
      username: "",
      role: "",
    },
    token: JSON.parse(localStorage.getItem("token")) || null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.token = null;
      state.user = {
        username: "",
        role: "",
      };
    },
  },
});
export const { login, logout } = cusAuthSlice.actions;
export const selectToken = (state) => state.cusAuth.token;
export const selectUser = (state) => state.cusAuth.user;
export default cusAuthSlice.reducer;
