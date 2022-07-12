import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ButtonBox, TableContainer, TableHeader } from "../Styled";
import { FormContainer, InputBox } from "../Styled";
import {  useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert, Snackbar, Stack } from "@mui/material";
import { getInfoVoucher, updateVoucher } from "./api";
export default function ShowVoucher() {
  const { id } = useParams();
  const [voucher, setVoucher] = useState({});
  const [edit, setEdit] = useState(false)
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [stateRes, setStateRes] = useState(null)
  const getVoucher = async () => {
    const res = await getInfoVoucher(id);
    reset({
      voucherName: res.voucherName,
      voucherCode: res.voucherCode,
      duration:res.duration
    })
    setVoucher(res)
  };
  useEffect(() => {
    getVoucher();
  }, [id]);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
        voucherName: "",
        voucherCode: "",
        duration: "",
    }
  });
  const onSubmit = async (data) => {
    const response = await updateVoucher(id, data)
    if (response?.status === 200) {
      setStateRes({
        msg: "Update Voucher Success",
        status: 200,
      })
      setOpenSnackBar(true);
      setEdit(false)
    }
    else {
      setStateRes({
        msg: "Update Voucher Fail",
        status: 400,
      })
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

      {voucher && (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
 
          <InputBox>
            <span>Voucher Name</span>
            <input type="text" defaultValue={voucher.voucherName} disabled={!edit} {...register("voucherName", {
              required: "Voucher Name is not empty",
            })} />
            <p>{errors.voucherName?.message}</p>
          </InputBox>
          <InputBox>
            <span>Voucher Code</span>
            <input type="text" defaultValue={voucher.voucherCode} disabled={!edit} {...register("voucherCode", {
              required: "Voucher Code is not empty",
            })} />
            <p>{errors.voucherCode?.message}</p>
          </InputBox>
          <InputBox>
            <span>Duration</span>
            <input type="text" defaultValue={voucher.duration} disabled={!edit} {...register("duration", {
              required: "Duration is not empty",
            })} />
            <p>{errors.duration?.message}</p>
          </InputBox>
          {
            edit && (<ButtonBox>
              <button>Update</button>
            </ButtonBox>)
          }

        </FormContainer>
      )}
      {
        stateRes && (
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
              open={openSnackBar}
              autoHideDuration={1000}
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
        )
      }
    </TableContainer>
  );
}
