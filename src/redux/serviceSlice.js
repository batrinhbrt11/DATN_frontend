import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../App";

const token = JSON.parse(localStorage.getItem("token"));

export const getAllService = createAsyncThunk("services/getAll", async () => {
    return await axios
        .get(`${URL}appointmenttype`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));
});
export const addService = createAsyncThunk("services/add", async (service) => {
    return await axios
        .post(`${URL}appointmenttype`, service, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => res)
        .catch((err) => err.response);
});

export const deleteService = createAsyncThunk("services/delete", async (id) => {
    var config = {
        method: "delete",
        url: `${URL}appointmenttype/${id}`,
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
const serviceSlice = createSlice({
    name: "services",
    initialState: {
        services: [],
        loading: false,
        length: null,
        error: {
            msg: null,
            status: null,
        },
    },
    extraReducers: {
        //getAll
        [getAllService.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllService.fulfilled]: (state, action) => {
            state.loading = false;
            state.services = action.payload;
            state.length = action.payload.length;
        },
        [getAllService.rejected]: (state, action) => {
            state.loading = false;
            state.error = "Invalid User";
        },
        //add
        [addService.pending]: (state, action) => {
            state.loading = true;
        },
        [addService.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.loading = false;
                state.services.push(action.payload.data);
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
        [addService.rejected]: (state, action) => {
            state.loading = false;
            state.error = "";
        },

        //delete
        [deleteService.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteService.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.data === true) {
                state.services = state.services.filter(s => s._id !== action.payload.id);
                state.length -= 1;
            }
        },
        [deleteService.rejected]: (state, action) => {
            state.loading = false;
            state.error = "Invalid User";
        },
    }
})
export default serviceSlice.reducer;
