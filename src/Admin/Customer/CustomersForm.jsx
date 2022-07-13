import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import formatDate from "../../lib/formatDate";
import { ButtonBox, FormContainer, InputBox } from "../Styled";
import { getInfoCustomer, updateUser } from "./api";
import { useForm } from "react-hook-form";
import { Alert, Snackbar, Stack } from "@mui/material";

export default function CustomersForm() {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const getCustomer = async () => {
    const res = await getInfoCustomer(id);
    setCustomer(res);
    reset({
      name: res.name,
      email: res.email,
      phoneNumber: res.phoneNumber,
      birth: new Date(res.birth),
    });
  };
  useEffect(() => {
    getCustomer();
  }, [id]);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      birth: null,
    },
  });
  const navigate = useNavigate();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [stateRes, setStateRes] = useState(null);
  const onSubmit = async (data) => {
    const response = await updateUser(id, data);
    if (response?.status === 200) {
      setStateRes({
        msg: "Update User Success",
        status: 200,
      });
      setOpenSnackBar(true);
      navigate(-1);
    } else {
      setStateRes({
        msg: "Update User Fail",
        status: 400,
      });
      setOpenSnackBar(true);
    }
  };
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };
  return (
    <div>
      {customer && (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <InputBox>
            <span>Full Name</span>
            <input
              type="text"
              defaultValue={customer.name}
              {...register("name", {
                required: "Name is not empty",
              })}
            />
            <p>{errors.name?.message}</p>
          </InputBox>
          <InputBox>
            <span>Email</span>
            <input
              type="text"
              defaultValue={customer.email}
              {...register("email", {
                required: "Email is not empty",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Email format is incorrect",
                },
              })}
            />
            <p>{errors.email?.message}</p>
          </InputBox>
          <InputBox>
            <span>Phone Number</span>
            <input
              type="text"
              defaultValue={customer.phoneNumber}
              {...register("phoneNumber", {
                required: "Phone Number is not empty",
                pattern: {
                  value: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                  message: "Phone Number format is incorrect",
                },
              })}
            />
            <p>{errors.phoneNumber?.message}</p>
          </InputBox>
          <InputBox>
            <span>Birthday</span>
            <input
              type="date"
              value={formatDate(new Date(customer.birth))}
              {...register("birth", {
                required: "Birthday is not empty",
              })}
            />
            <p>{errors.birth?.message}</p>
          </InputBox>
          <InputBox></InputBox>
          <ButtonBox>
            <input type="submit" value="Update" />
          </ButtonBox>
        </FormContainer>
      )}
      {stateRes && (
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={openSnackBar}
            autoHideDuration={3000}
            onClose={handleCloseSnackBar}
          >
            <Alert
              severity={stateRes.status === 200 ? "success" : "error"}
              sx={{ width: "100%" }}
            >
              {stateRes.msg}
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </div>
  );
}
