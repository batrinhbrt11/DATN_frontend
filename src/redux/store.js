import { configureStore } from "@reduxjs/toolkit";
import cusAuthReducer from "./cusAuthSlice";
import voucherReducer from "./VoucherSlice";
import customerReducer from "./CustomerSlice";
import infoReducer from "./infoSlice";
import staffReducer from "./staffSlice";
import serviceReducer from "./serviceSlice";
import appointmentReducer from "./appointmentSlice";
export default configureStore({
  reducer: {
    cusAuth: cusAuthReducer,
    vouchers: voucherReducer,
    customers: customerReducer,
    info: infoReducer,
    staffs: staffReducer,
    services: serviceReducer,
    appointments: appointmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
