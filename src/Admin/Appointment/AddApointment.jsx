import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeAppointment } from "../../Customer/Appointment/api";
import { getAllService } from "../../redux/serviceSlice";
import { getAllStaff } from "../../redux/staffSlice";
import {
  ButtonBox,
  FormContainer,
  InputBox,
  TableContainer,
  TableHeader,
} from "../Styled";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enLocale from "date-fns/locale/en-US";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
export default function AddApointment() {
  const dispatch = useDispatch();
  const listStaffs = useSelector((state) => state.staffs);
  const listServices = useSelector((state) => state.services);
  const [staffs, setStaffs] = useState(listStaffs.staffs);
  const [services, setServices] = useState(listServices.services);
  useEffect(() => {
    dispatch(getAllStaff());
    dispatch(getAllService());
  }, [dispatch]);
  useEffect(() => {
    setServices(listServices.services);
  }, [listServices]);
  useEffect(() => {
    setStaffs(listStaffs.staffs);
  }, [listStaffs]);
  const [error, setError] = useState("");
  const [appointment, setAppointment] = useState({
    appointmentTypeId: "",
    phoneNumber: "",
    customerName: "",
    customerId: "",
    staffId: "",
    date: new Date(),
  });
  const [success, setSuccess] = useState("");
  const isPhoneNumber = (phoneNumber) => {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (vnf_regex.test(phoneNumber) === false) {
      return false;
    }
    return true;
  };
  const isValidDay = (date) => {
    var now = new Date();
    var Difference_In_Time = date.getTime() - now.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600);
    if (Difference_In_Days >= 2) {
      return true;
    }
    return false;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (appointment.customerName === "" || appointment.phoneNumber === "") {
      return setError("Please enter your information!");
    }
    if (!isPhoneNumber(appointment.phoneNumber)) {
      return setError("Phone number is Invalid!");
    }

    if (appointment.appointmentTypeId === "") {
      return setError("Please choosing service!");
    }
    if (appointment.staffId === "") {
      return setError("Please choosing staff!");
    }
    if (!isValidDay(appointment.date)) {
      return setError(
        "Time is invalid! Please booking appointment after 2 hours"
      );
    }
    const res = await makeAppointment(appointment);
    if (res.status === 200) {
      setAppointment({
        appointmentTypeId: "",
        phoneNumber: "",
        customerName: "",
        customerId: "",
        staffId: "",
        date: new Date(),
      });
      setSuccess("Successfully added Appointment");
      setOpenSnackBar(true);
    }
  };

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };
  return (
    <div>
      <TableContainer>
        <TableHeader>
          <h2>Add Appointment</h2>
        </TableHeader>
        <FormContainer onSubmit={handleSubmit}>
          {error !== "" && (
            <p
              style={{
                width: "100%",
                textAlign: "center",
                color: "#fd1414",
                fontWeight: "100",
                fontSize: "1.2rem",
              }}
            >
              {error}
            </p>
          )}
          <InputBox>
            <span>Customer Name:</span>
            <input
              type="text"
              value={appointment.customerName}
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  customerName: e.target.value,
                })
              }
              onFocus={() => setError("")}
            />
          </InputBox>
          <InputBox>
            <span>Phone Number</span>
            <input
              type="text"
              value={appointment.phoneNumber}
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  phoneNumber: e.target.value,
                })
              }
              onFocus={() => setError("")}
            />
          </InputBox>
          <InputBox>
            <span>Service Name</span>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ fontSize: "16px" }}
              >
                Services
              </InputLabel>
              <Select
                onFocus={() => setError("")}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={appointment.appointmentTypeId}
                label="Services"
                onChange={(event) => {
                  setError("");
                  setAppointment({
                    ...appointment,
                    appointmentTypeId: event.target.value,
                  });
                }}
                MenuProps={MenuProps}
              >
                {services &&
                  services.map((s) => (
                    <MenuItem
                      key={s._id}
                      value={s._id}
                      sx={{ fontSize: "16px" }}
                    >
                      {s.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </InputBox>
          <InputBox>
            <span>Staff Name</span>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ fontSize: "16px" }}
              >
                Staff
              </InputLabel>
              <Select
                onFocus={() => setError("")}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={appointment.staffId}
                label="Staff"
                onChange={(event) => {
                  setAppointment({
                    ...appointment,
                    staffId: event.target.value,
                  });
                  setError("");
                }}
                MenuProps={MenuProps}
              >
                {staffs &&
                  staffs.map((s) => (
                    <MenuItem
                      key={s._id}
                      value={s._id}
                      sx={{ fontSize: "16px" }}
                    >
                      {s.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </InputBox>
          <InputBox style={{ width: "100%" }}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={locale}
            >
              <DateTimePicker
                renderInput={(props) => (
                  <TextField {...props} sx={{ color: "#000", width: "100%" }} />
                )}
                label="Time"
                value={appointment.date}
                onChange={(newValue) => {
                  setAppointment({ ...appointment, date: newValue });
                  setError("");
                }}
              />
            </LocalizationProvider>
          </InputBox>

          <ButtonBox>
            <input type="submit" value="Save" />
          </ButtonBox>
        </FormContainer>
      </TableContainer>
      {success !== "" && (
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={openSnackBar}
            autoHideDuration={3000}
            onClose={handleCloseSnackBar}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              {success}
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </div>
  );
}
const locale = enLocale;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
