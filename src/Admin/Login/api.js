import axios from "axios";
import { URL } from "../../App";

export const adminLogin = async (user) => {
  const res = await axios
    .post(`${URL}user/login`, {
      username: user.username,
      password: user.password,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
  return res;
};
