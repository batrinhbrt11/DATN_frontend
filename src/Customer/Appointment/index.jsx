import React, { useState } from "react";
import styled from "styled-components";
import enLocale from "date-fns/locale/en-US";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Column, Form, Row } from "../ShareStyled";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/cusAuthSlice";

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
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const token = useSelector(selectToken);
  const [timePickerValue, setTimePickerValue] = useState(new Date());
  return (
    <Container>
      <Form>
        <Row style={{ width: "100%" }}>
          <h1 style={{ width: "100%", textAlign: "center" }}>
            Make Appointment
          </h1>
        </Row>
        {token === null && (
          <Row>
            <Column>
              <Input type="text" name="lastName" placeholder="Your name" />
            </Column>
            <Column>
              <Input
                type="text"
                name="lastName"
                placeholder="Your Phone number"
              />
            </Column>
          </Row>
        )}

        <Row>
          <Column>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ fontSize: "16px" }}
              >
                Services
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                MenuProps={MenuProps}
              >
                <MenuItem value={10} sx={{ fontSize: "16px" }}>
                  Ten
                </MenuItem>
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
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                MenuProps={MenuProps}
              >
                <MenuItem value={10} sx={{ fontSize: "16px" }}>
                  Ten
                </MenuItem>
              </Select>
            </FormControl>
          </Column>
        </Row>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={locale}
        >
          <Row>
            <Column>
              <DatePicker
                value={datePickerValue}
                onChange={(newValue) => setDatePickerValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
                className="date-time-picker"
              />
            </Column>
            <Column>
              <TimePicker
                value={timePickerValue}
                onChange={(newValue) => setTimePickerValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
                className="date-time-picker"
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

const SelectBox = styled.select`
  padding: 14px;
  background-color: transparent;
  border: 1px solid #999;
  font-size: 1.5rem;
  color: #000;
  width: 100%;
  border-radius: 5px;
  max-height: 100px;
  overflow-y: scroll;
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
