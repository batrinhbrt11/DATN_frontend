import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../App";

const token = JSON.parse(localStorage.getItem("token"));

export const getAllAppointment = createAsyncThunk(
  "appointments/getAll",
  async () => {
    return await axios
      .get(`${URL}appointment`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }
);
export const addAppointment = createAsyncThunk(
  "appointments/add",
  async (service) => {
    return await axios
      .post(`${URL}appointment`, service, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => res)
      .catch((err) => err.response);
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointments/delete",
  async (id) => {
    var config = {
      method: "delete",
      url: `${URL}appointment/${id}`,
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
  }
);
const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    loading: false,
    length: null,
    error: {
      msg: null,
      status: null,
    },
  },
  extraReducers: {
    //getAll
    [getAllAppointment.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllAppointment.fulfilled]: (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
      state.length = action.payload.length;
    },
    [getAllAppointment.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Invalid User";
    },
    //add
    [addAppointment.pending]: (state, action) => {
      state.loading = true;
    },
    [addAppointment.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.loading = false;
        state.appointments.push(action.payload.data);
        state.length += 1;
        state.error = {
          msg: "Add Service Successful",
          status: action.payload.status,
        };
      } else {
        state.error = {
          msg: action.payload.data.errorMsg,
          status: action.payload.status,
        };
      }
    },
    [addAppointment.rejected]: (state, action) => {
      state.loading = false;
      state.error = "";
    },

    //delete
    [deleteAppointment.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteAppointment.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.data === true) {
        state.appointments = state.appointments.filter(
          (s) => s._id !== action.payload.id
        );
        state.length -= 1;
      }
    },
    [deleteAppointment.rejected]: (state, action) => {
      state.loading = false;
      state.error = "Invalid User";
    },
  },
});

export const selectAppointmentToday= (state) => {
  if (state.appointments.appointments && state.appointments.appointments.length > 0) {
    const today = new Date();
    var list = [];
    state.appointments.appointments.forEach((c) => {
      const dayOfAppointments= new Date(c.date);
      if (
        today.getDate() === dayOfAppointments.getDate() &&
        today.getMonth() === dayOfAppointments.getMonth()
      ) {
        list.push(c);
      }
    });
    return list;
  }
  return [];
};
export default appointmentSlice.reducer;
