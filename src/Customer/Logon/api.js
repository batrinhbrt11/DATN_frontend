import axios from "axios";
import { URL } from "../../App";

export const customerRegister = async (user) => {
  const res = await axios
    .post(`${URL}customer/register`, {
      name: user.name,
      birth: user.birthday,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data.message;
    });
  return res;
};

export const customerLogin = async (user) => {
  const res = await axios
    .post(`${URL}customer/login`, {
      username: user.phoneNumber,
      password: user.password,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data.message;
    });
  return res;
};
const token = JSON.parse(localStorage.getItem("token"));
export const getVoucherOfCustomer = async (id) => {
  const res = await axios
    .get(`${URL}customervoucher/customer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};


export const getHistoryOfCustomer = async()=>{
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
export const changeAccountPassword = async(data)=>{
  return await axios
      .post(`${URL}customer/changepwd`,{oldPassword:data.password,newPassword:data.newPassword }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
}