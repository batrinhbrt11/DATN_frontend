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
export const getCustomerVoucher = async (id) => {
  const res = await axios
    .get(`${URL}customervoucher/customer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      return err.response;
    });
  return res.vouchers;
};

export const updateUser = async (id, user) => {
  var config = {
    method: "put",
    url: `${URL}customer/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: { ...user, id: id },
  };
  return await axios(config)
    .then((res) => {
      return res;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteVoucherOfCustomer = async (id) => {
  var config = {
    method: "delete",
    url: `${URL}customervoucher/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  return await axios(config)
    .then((res) => {
      return res.status;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const giveVoucherForCustomer = async (voucherId, customerId) => {
  return await axios
    .post(
      `${URL}customervoucher`,
      { voucherId: voucherId, customerId: customerId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res)
    .catch((err) => err.response);
};
