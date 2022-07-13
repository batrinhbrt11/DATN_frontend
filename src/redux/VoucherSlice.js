import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../App";

const token = JSON.parse(localStorage.getItem("token"));
export const getAllVoucher = createAsyncThunk("vouchers/getAll", async () => {
  return await axios
    .get(`${URL}voucher`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export const addVoucher = createAsyncThunk("vouchers/add", async (voucher) => {
  return await axios
    .post(`${URL}voucher`, voucher, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res)
    .catch((err) => err.response);
});

export const deleteVoucher = createAsyncThunk("vouchers/delete", async (id) => {
  var config = {
    method: "delete",
    url: `${URL}voucher/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios(config)
    .then((res) => {
      return { ...res, id: id };
    })
    .catch(function (error) {
      console.log(error);
    });
});
const voucherSlice = createSlice({
  name: "vouchers",
  initialState: {
    vouchers: [],
    loading: false,
    length: null,
    error: {
      msg: null,
      status: null,
    },
  },
  extraReducers: {
    //getAll
    [getAllVoucher.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllVoucher.fulfilled]: (state, action) => {
      state.loading = false;
      state.vouchers = action.payload;
      state.length = action.payload.length;
    },
    [getAllVoucher.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Invalid User";
    },
    //addVoucher
    [addVoucher.pending]: (state, action) => {
      state.loading = true;
    },
    [addVoucher.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.loading = false;
        state.vouchers.push(action.payload.data);
        state.length += 1;
        state.error = {
          msg: "Add Voucher Successful",
          status: action.payload.status,
        };
      } else {
        state.error = {
          msg: action.payload.data.errorMsg,
          status: action.payload.status,
        };
      }
    },
    [addVoucher.rejected]: (state, action) => {
      state.loading = false;
      state.error = "";
    },

    //delete
    [deleteVoucher.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteVoucher.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.data === true) {
        state.vouchers = state.vouchers.filter(
          (s) => s._id !== action.payload.id
        );
        state.length -= 1;
      }
    },
    [deleteVoucher.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Invalid User";
    },
  },
});

export const selectVoucher = (state) => state.vouchers;
export default voucherSlice.reducer;
