import React, { useEffect, useState } from "react";
import styled from "styled-components";
import enLocale from "date-fns/locale/en-US";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Column, Form, Row } from "../ShareStyled";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/cusAuthSlice";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { getAllStaff } from "../../redux/staffSlice";
import { getAllService } from "../../redux/serviceSlice";
import { makeAppointment } from "./api";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
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
export default function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const [appointment, setAppointment] = useState({
    appointmentTypeId: "",
    phoneNumber: "",
    customerName: "",
    staffId:"",
    customerId: user?.id || "",
    date: new Date(),
  });
  const [error, setError] = useState("");
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const listStaffs = useSelector((state) => state.staffs);
  const listServices = useSelector((state) => state.services);
  const [staffs, setStaffs] = useState(listStaffs.staffs);
  const [services, setServices] = useState(listServices.services);
  const [success, setSuccess] = useState("");
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
    if (appointment.customerId === "") {
      if (appointment.customerName === "" || appointment.phoneNumber === "") {
        return setError("Please enter your information!");
      }
      if (!isPhoneNumber(appointment.phoneNumber)) {
        return setError("Phone number is Invalid!");
      }
    }
    if (appointment.appointmentTypeId === "") {
      return setError("Please choosing service!");
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
        customerId:user?.id || "",
        staffId:"",
        date: new Date(),
      });
      setSuccess("Successfully added Appointment");
      setOpen(true)
    }
    else {
      return setError(res.data);
    }
  };
  const [open, setOpen] =useState(false);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setOpen(false)
    }, 3000)
    return () => {
      clearTimeout(timeId)
    }
  }, [success]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row style={{ width: "100%" }}>
          <h1 style={{ width: "100%", textAlign: "center" }}>
            Make Appointment
          </h1>
        </Row>
        
        {error !== "" ? (
          <Row style={{ width: "100%" }}>
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
          </Row>
        ) :null}
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {success}
        </Alert>
      </Collapse>

        {token === null && (
          <Row>
            <Column>
              <Input
                type="text"
                placeholder="Your name"
                value={appointment.customerName}
                onChange={(e) =>
                  setAppointment({
                    ...appointment,
                    customerName: e.target.value,
                  })
                }
                onFocus={() => setError("")}
              />
            </Column>
            <Column>
              <Input
                type="text"
                placeholder="Your Phone number"
                onChange={(e) =>
                  setAppointment({
                    ...appointment,
                    phoneNumber: e.target.value,
                  })
                }
                value={appointment.phoneNumber}
                onFocus={() => setError("")}
              />
            </Column>
          </Row>
        )}

        <Row>
          <Column >
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
                onChange={(event) =>
                  setAppointment({
                    ...appointment,
                    appointmentTypeId: event.target.value,
                  })
                }
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
          </Column>
          <Column>
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
                onChange={(event) =>
                  setAppointment({
                    ...appointment,
                    staffId: event.target.value,
                  })
                }
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
          </Column>
        </Row>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={locale}
        >
          <Row>
            <Column style={{ width: "100%" }}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Time"
                value={appointment.date}
                onChange={(newValue) => {
                  setAppointment({ ...appointment, date: newValue });
                  setError("");
                }}
              />
            </Column>
          </Row>
        </LocalizationProvider>

        <Row>
          <ServicesBtn>Make Appointment</ServicesBtn>
        </Row>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  background: linear-gradient(rgba(33, 30, 28, 0.7), rgba(33, 40, 28, 0.7)),
    url(img/carousel-1.jpg);
  height: 800px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  margin-bottom: 20px;
  position: relative;
`;

const Input = styled.input`
  padding: 14px;
  background-color: transparent;
  border: 1px solid #999;
  font-size: 1.5rem;
  color: #000;
  width: 100%;
  border-radius: 5px;
`;


const ServicesBtn = styled.button`
  border-radius: 4px;
  background-color: #f9a392;
  padding: 18px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  border-color: #f9a392;
  font-size: 1.5rem;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  width: 100%;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fd7e14;
  }
`;
