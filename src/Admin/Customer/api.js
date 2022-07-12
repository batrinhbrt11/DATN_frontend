import axios from "axios";
import { URL } from "../../App";

const token = JSON.parse(localStorage.getItem("token"));
export const getInfoCustomer = async (id) => {
  const res = await axios
    .get(`${URL}customer/${id}`, {
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
export const getCustomerVoucher= async(id)=>{
  const res = await axios.get(`${URL}customervoucher/customer/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }) .then((res) => res.data)
  .catch((err) => {
    return err.response;
  });
  return res.vouchers;
}

export const updateUser = async (id,user)=>{
  var config = {
    method: "put",
    url: `${URL}customer/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: {...user,id:id},
  };
  return await axios(config)
    .then((res) => {
      return res})
    .catch(function (error) {
      console.log(error);
    });
}

