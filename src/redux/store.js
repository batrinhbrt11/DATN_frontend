import { configureStore } from "@reduxjs/toolkit";
import cusAuthReducer from "./cusAuthSlice";
export default configureStore({
  reducer: {
    cusAuth: cusAuthReducer,
  },
});
