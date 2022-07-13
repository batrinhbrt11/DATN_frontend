import axios from "axios";
import { URL } from "../../App";
const token = JSON.parse(localStorage.getItem("token"));
export const makeAppointment = async (appointment) => {
  return await axios
    .post(`${URL}appointment`, appointment, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res)
    .catch((err) => err.response);
};
