import { Alert, Snackbar, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addService } from '../../redux/serviceSlice';
import { ButtonBox, FormContainer, InputBox, TableContainer, TableHeader } from '../Styled'

export default function AddServices() {
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm();
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const dispatch = useDispatch();
    const massage = useSelector((state) => state.services.error);
    const onSubmit = async (data) => {
        await dispatch(addService(data));
        setOpenSnackBar(true);
    };
    useEffect(() => {
        if (massage.status === 200) {
            reset({
                name: "",
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
        <TableContainer>
            <TableHeader>
                <h2>Add Services</h2>
            </TableHeader>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <InputBox style={{ width: "100%" }}>
                    <span>Name</span>
                    <input
                        type="text"
                        placeholder="Name"
                        {...register("name", {
                            required: "Name is not empty",
                        })}
                    />
                    <p>{errors.name?.message}</p>
                </InputBox>

                <ButtonBox>
                    <input type="submit" value="Save" />
                </ButtonBox>
            </FormContainer>

            <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={1000}
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
        </TableContainer>
    )
}
