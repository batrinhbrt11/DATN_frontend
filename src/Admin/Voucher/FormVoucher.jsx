import React, { useEffect, useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addVoucher } from "../../redux/VoucherSlice";
import { ButtonBox, FormContainer, InputBox } from "../Styled";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Alert, Stack } from "@mui/material";

export default function FormVoucher() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const dispatch = useDispatch();
  const massage = useSelector((state) => state.vouchers.error);
  const onSubmit = async (data) => {
    await dispatch(addVoucher(data));
    setOpenSnackBar(true);
  };
  useEffect(() => {
    if (massage.status === 200) {
      reset({
        voucherName: "",
        voucherCode: "",
        duration: "",
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
          <span>Voucher name</span>
          <input
            type="text"
            placeholder="Voucher name..."
            {...register("voucherName", {
              required: "Voucher name is not empty",
            })}
          />
          <p>{errors.voucherName?.message}</p>
        </InputBox>
        <InputBox>
          <span>Voucher Code</span>
          <input
            type="text"
            placeholder="Voucher code"
            {...register("voucherCode", {
              required: "Voucher code is not empty",
              minLength: {
                value: 6,
                message: "A minimum Voucher code length greater than 6",
              },
            })}
          />
          <p>{errors.voucherCode?.message}</p>
        </InputBox>
        <InputBox>
          <span>Duration</span>
          <input
            type="text"
            placeholder="Duration..."
            {...register("duration", {
              required: "Duration is not empty",
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                message: "Duration format is incorrect",
              },
            })}
          />
          <p>{errors.duration?.message}</p>
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
