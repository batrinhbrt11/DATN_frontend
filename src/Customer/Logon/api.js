import axios from "axios";
import { URL } from "../../App";

export const customerRegister = async (user) => {
  const res = await axios.post(`${URL}customer/register`);
};
