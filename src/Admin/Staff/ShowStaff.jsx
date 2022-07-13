import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ButtonBox, TableContainer, TableHeader } from "../Styled";
import { FormContainer, InputBox } from "../Styled";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import formatDate from "../../lib/formatDate";
import { getInfoStaff, updateStaff } from "./api";
import { Alert, Snackbar, Stack } from "@mui/material";
export default function ShowStaff() {
  const { id } = useParams();
  const [staff, setStaff] = useState({});
  const [edit, setEdit] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [stateRes, setStateRes] = useState(null);
  const getStaff = async () => {
    const res = await getInfoStaff(id);
    reset({
      name: res.name,
      email: res.email,
      phoneNumber: res.phoneNumber,
      birth: new Date(res.birth),
    });
    setStaff(res);
  };
  useEffect(() => {
    getStaff();
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
  const onSubmit = async (data) => {
    const response = await updateStaff(id, data);
    if (response?.status === 200) {
      setStateRes({
        msg: "Update Staff Success",
        status: 200,
      });
      setOpenSnackBar(true);
      setEdit(false);
    } else {
      setStateRes({
        msg: "Update Staff Fail",
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
    <TableContainer>
      <TableHeader>
        <h2>Staff's Information</h2>
        <Button
          variant="contained"
          className="edit-btn"
          sx={{ fontSize: "2rem" }}
          onClick={() => setEdit(!edit)}
        >
          Edit
        </Button>
      </TableHeader>

      {staff && (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <InputBox>
            <span>Username</span>
            <input type="text" defaultValue={staff.username} disabled />
          </InputBox>
          <InputBox>
            <span>Full Name</span>
            <input
              type="text"
              defaultValue={staff.name}
              disabled={!edit}
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
              defaultValue={staff.email}
              disabled={!edit}
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
              defaultValue={staff.phoneNumber}
              disabled={!edit}
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
          {edit ? (
            <InputBox>
              <span>Birthday</span>
              <input
                type="date"
                dafaultValue={formatDate(new Date(staff.birth))}
                {...register("birth", {
                  required: "Birthday is not empty",
                })}
              />
              <p>{errors.birth?.message}</p>
            </InputBox>
          ) : (
            <InputBox>
              <span>Birthday</span>
              <input
                type="text"
                value={formatDate(new Date(staff.birth))}
                disabled
              />
              <p>{errors.birth?.message}</p>
            </InputBox>
          )}
          <InputBox></InputBox>
          {edit && (
            <ButtonBox>
              <button>Update</button>
            </ButtonBox>
          )}
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
    </TableContainer>
  );
}
