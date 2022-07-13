import React, { useEffect, useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ButtonBox, FormContainer, InputBox } from "../Styled";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Alert, Stack } from "@mui/material";
import { addStaff } from "../../redux/staffSlice";

export default function FormStaff() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const dispatch = useDispatch();
  const massage = useSelector((state) => state.staffs.error);
  const onSubmit = async (data) => {
    await dispatch(addStaff(data));
    setOpenSnackBar(true);
  };
  useEffect(() => {
    if (massage.status === 200) {
      reset({
        username: "",
        password: "",
        name: "",
        email: "",
        phoneNumber: "",
        birth: "",
      });
    }
  }, [dispatch, massage, reset]);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };
  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <InputBox>
          <span>Staff Username</span>
          <input
            type="text"
            placeholder="Username..."
            {...register("username", {
              required: "Username is not empty",
            })}
          />
          <p>{errors.username?.message}</p>
        </InputBox>
        <InputBox>
          <span>Staff Password</span>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is not empty",
              minLength: {
                value: 6,
                message: "A minimum password length greater than 6",
              },
            })}
          />
          <p>{errors.password?.message}</p>
        </InputBox>
        <InputBox>
          <span>Staff Name</span>
          <input
            type="text"
            placeholder="Name"
            {...register("name", {
              required: "Name is not empty",
            })}
          />
          <p>{errors.name?.message}</p>
        </InputBox>
        <InputBox>
          <span>Staff Email</span>
          <input
            type="text"
            placeholder="Email"
            {...register("email", {
              required: "Email is not empty",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Email format is incorrect",
              },
            })}
          />
          <p>{errors.name?.message}</p>
        </InputBox>
        <InputBox>
          <span>Phone number</span>
          <input
            type="text"
            placeholder="Phone Number"
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
            placeholder="Birthday"
            {...register("birth", {
              required: "Birthday is not empty",
            })}
          />
          <p>{errors.birth?.message}</p>
        </InputBox>
        <ButtonBox>
          <input type="submit" value="Save" />
        </ButtonBox>
      </FormContainer>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
        >
          <Alert
            severity={massage.status === 200 ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {massage.msg}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
