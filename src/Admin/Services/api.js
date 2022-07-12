import axios from "axios";
import { URL } from "../../App";

const token = JSON.parse(localStorage.getItem("token"));
export const getInfoService = async (id) => {
  const res = await axios
    .get(`${URL}appointmenttype/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      return err.response;
    });
  return res;
};
export const updateService = async (id,service)=>{
    var config = {
      method: "put",
      url: `${URL}appointmenttype/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: service,
    };
    return await axios(config)
      .then((res) => {
        return res})
      .catch(function (error) {
        console.log(error);
      });
  }
  
  