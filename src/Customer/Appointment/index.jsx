import React, { useState } from "react";
import styled from "styled-components";
import enLocale from "date-fns/locale/en-US";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Column, Form, Row } from "../ShareStyled";
const locale = enLocale;
export default function () {
  const [datePickerValue, setDatePickerValue] = useState(new Date());

  const [timePickerValue, setTimePickerValue] = useState(new Date());
  return (
    <Container>
      <Form>
        <Row>
          <h1>Make Appointment</h1>
        </Row>
        <Row>
          <Column>
            <Input type="text" name="lastName" placeholder="Your name" />
          </Column>
          <Column>
            <Input type="text" name="lastName" placeholder="Your Email" />
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
          <Column>
            <Select name="cars" id="cars" defaultValue={"0"}>
              <option value="0">Service:</option>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </Select>
          </Column>
          <Column>
            <ServicesBtn>Make Appointment</ServicesBtn>
          </Column>
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
  padding: 10px;
  background-color: transparent;
  border: 1px solid #fff;
  font-size: 1.5rem;
  color: #fff;
  width: 100%;
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
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  width: 100%;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fd7e14;
  }
`;
const Select = styled.select`
  padding: 10px;
  background-color: transparent;
  border: 1px solid #fff;
  font-size: 1.5rem;
  color: #fff;
  width: 100%;
  & option {
    font-size: 1.5rem;
    background-color: #000;
    padding: 10px !important;
    color: #fff;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
  }
`;
