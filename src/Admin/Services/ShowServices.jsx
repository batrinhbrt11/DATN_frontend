import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ButtonBox, TableContainer, TableHeader } from "../Styled";
import { FormContainer, InputBox } from "../Styled";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert, Snackbar, Stack } from "@mui/material";
import { getInfoService, updateService } from "./api";
export default function ShowServices() {
  const { id } = useParams();
  const [service, setService] = useState({});
  const [edit, setEdit] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [stateRes, setStateRes] = useState(null);
  const getService = async () => {
    const res = await getInfoService(id);
    reset({
      name: res.name,
    });
    setService(res);
  };
  useEffect(() => {
    getService();
  }, [id]);
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (data) => {
    const response = await updateService(id, data);
    if (response?.status === 200) {
      setStateRes({
        msg: "Update Service Success",
        status: 200,
      });
      setOpenSnackBar(true);
      setEdit(false);
    } else {
      setStateRes({
        msg: "Update Service Fail",
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
        <h2>Service's Information</h2>
        <Button
          variant="contained"
          className="edit-btn"
          sx={{ fontSize: "2rem" }}
          onClick={() => setEdit(!edit)}
        >
          Edit
        </Button>
      </TableHeader>

      {service && (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <InputBox style={{ width: "100%" }}>
            <span>Service Name</span>
            <input
              type="text"
              defaultValue={service.name}
              disabled={!edit}
              {...register("name", {
                required: "Service Name is not empty",
              })}
            />
            <p>{errors.bame?.message}</p>
          </InputBox>
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
