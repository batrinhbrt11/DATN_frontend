import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../App";

const token = JSON.parse(localStorage.getItem("token"));
const userId = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user")).id
  : null;
export const getInfo = createAsyncThunk("info/get", async () => {
  return await axios
    .get(`${URL}customer/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      return err;
    });
});

export const editInfo = createAsyncThunk(
  "info/create",
  async ({ userId, data }) => {
    var config = {
      method: "put",
      url: `${URL}customer/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { ...data, _id: userId },
    };
    return await axios(config)
      .then((res) => {
        return res.data})
      .catch(function (error) {
        console.log(error);
      });
  }
);
const infoSlice = createSlice({
  name: "info",
  initialState: {
    info: {
      _id: "",
      name: "",
      phoneNumber: "",
      birth: new Date(),
      email: "",
    },
    loading: false,
    error: {
      msg: null,
      status: null,
    },
  },
  extraReducers: {
    //getAll
    [getInfo.pending]: (state, action) => {
      state.loading = true;
    },
    [getInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.info = action.payload;
    },
    [getInfo.rejected]: (state, action) => {
      state.loading = false;
    },
    //edit
    [editInfo.pending]: (state, action) => {
      state.loading = true;
    },
    [editInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.info = action.payload;
    },
    [editInfo.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const selectUserId = (state) => state.info.info._id;
export default infoSlice.reducer;
