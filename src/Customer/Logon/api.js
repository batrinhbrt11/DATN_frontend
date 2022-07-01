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
