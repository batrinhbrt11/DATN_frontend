import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../App";

const token = JSON.parse(localStorage.getItem("token"));

export const getAllStaff = createAsyncThunk("staffs/getAll", async () => {
  return await axios
    .get(`${URL}staff`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
});
export const addStaff = createAsyncThunk("staffs/add", async (staff) => {
  return await axios
    .post(`${URL}staff`, staff, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {

      return { status: 200, data: staff };
    })
    .catch((err) => {
      console.log(err)
      return err.response
    });
});
export const deleteStaff = createAsyncThunk("staffs/delete", async (id) => {
  var config = {
    method: "delete",
    url: `${URL}staff/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  };
  return await axios(config)
    .then((res) => {
      return { ...res, id: id }
    })
    .catch(function (error) {
      console.log(error);
    });
})
const staffSlice = createSlice({
  name: "staffs",
  initialState: {
    staffs: [],
    loading: false,
    length: null,
    error: {
      msg: null,
      status: null,
    },
  },
  extraReducers: {
    //getAll
    [getAllStaff.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllStaff.fulfilled]: (state, action) => {
      state.loading = false;
      state.staffs = action.payload;
      state.length = action.payload.length;
    },
    [getAllStaff.rejected]: (state, action) => {
      state.loading = false;
    },
    //addStaff
    [addStaff.pending]: (state, action) => {
      state.loading = true;
    },
    [addStaff.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.loading = false;
        state.staffs.push(action.payload.data);
        state.length += 1;
        state.error = {
          msg: "Add Staff Successful",
          status: action.payload.status,
        };
      } else {
        state.error = {
          msg: action.payload.data.message,
          status: action.payload.status,
        };
      }
    },
    [addStaff.rejected]: (state, action) => {
      state.loading = false;
      state.error = "";
    },
    //delete
    [deleteStaff.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteStaff.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.data === true) {
        state.staffs = state.staffs.filter(s => s._id !== action.payload.id);
        state.length -= 1;
      }
    },
    [deleteStaff.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Invalid User";
    },
  },
});
export default staffSlice.reducer;
