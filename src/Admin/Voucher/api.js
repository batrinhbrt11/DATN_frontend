import axios from "axios";
import { URL } from "../../App";

const token = JSON.parse(localStorage.getItem("token"));
export const getInfoVoucher = async (id) => {
  const res = await axios
    .get(`${URL}voucher/${id}`, {
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
export const updateVoucher = async (id, voucher) => {
  var config = {
    method: "put",
    url: `${URL}voucher/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: voucher,
  };
  return await axios(config)
    .then((res) => {
      return res;
    })
    .catch(function (error) {
      console.log(error);
    });
};
