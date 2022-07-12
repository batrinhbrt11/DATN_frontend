import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../App";

const token = JSON.parse(localStorage.getItem("token"));
export const getAllCustomer = createAsyncThunk("customers/getAll", async () => {
  return await axios
    .get(`${URL}customer`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
});
export const deleteCustomer = createAsyncThunk("customers/delete",async(id)=>{
  var config = {
    method: "delete",
    url: `${URL}customer/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  };
  return await axios(config)
    .then((res) => {
      return {...res,id:id}})
    .catch(function (error) {
      console.log(error);
    });
})

export const addUser = createAsyncThunk("customers/add",async(data)=>{
  return await axios
    .post(`${URL}customer/register`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
        console.log(err)
        return err.response});
})
const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    loading: false,
    length: null,
    error: {
      msg: null,
      status: null,
    },
  },
  extraReducers: {
    //getAll
    [getAllCustomer.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllCustomer.fulfilled]: (state, action) => {
      state.loading = false;
      state.customers = action.payload;
      state.length = action.payload.length;
    },
    [getAllCustomer.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Invalid User";
    },
    //delete
    [deleteCustomer.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCustomer.fulfilled]: (state, action) => {
      state.loading = false;
      if(action.payload.data === true){
        state.customers = state.customers.filter(c=> c._id !== action.payload.id);
        state.length -=1;
      }
    },
    [deleteCustomer.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Invalid User";
    },
    //add
    [addUser.pending]: (state, action) => {
      state.loading = true;
    },
    [addUser.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.loading = false;
        state.error = {
          msg: "Add User Successful",
          status: action.payload.status,
        };
      } else {
        state.error = {
          msg: action.payload.data.message,
          status: action.payload.status,
        };
      }
    },
    [addUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = "";
    },
  },
});

export const selectCustomers = (state) => state.customers;
export const selectBirthDayCustomer = (state) => {
  if (state.customers.customers && state.customers.customers.length > 0) {
    const today = new Date();
    var list = [];
    state.customers.customers.forEach((c) => {
      const dayOfBirth = new Date(c.birth);
      if (
        today.getDate() === dayOfBirth.getDate() &&
        today.getMonth() === dayOfBirth.getMonth()
      ) {
        list.push(c);
      }
    });
    return list;
  }
  return [];
};
export default customerSlice.reducer;
