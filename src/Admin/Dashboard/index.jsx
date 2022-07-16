import React, { useEffect, useState } from "react";
import { Details, TableContainer, TableHeader } from "../Styled";

import { Link, useNavigate } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
} from "../TableStyled";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCustomer,
  selectBirthDayCustomer,
} from "../../redux/CustomerSlice";
import formatDate from "../../lib/formatDate";
import { IconButton } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { getAllAppointment, selectAppointmentToday } from "../../redux/appointmentSlice";
import { format, parseISO } from "date-fns";
export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.customers);
  const listCustomerBirthday = useSelector(selectBirthDayCustomer);
  const [rows, setRows] = useState(data.customers);
  const [isBirthday, setIsBirthday] = useState([]);
  useEffect(() => {
    dispatch(getAllCustomer());
    dispatch(getAllAppointment())
  }, [dispatch]);
  useEffect(() => {
    setRows(data.customers.slice(0, 5));
  }, [data]);
  useEffect(() => {
    setIsBirthday(listCustomerBirthday);
  }, [listCustomerBirthday]);
  const [appointmentToday, setAppointmentToday] = useState([]);
  const listAppointment = useSelector(selectAppointmentToday)
  useEffect(() => {
    setAppointmentToday(listAppointment);
    console.log(listAppointment)
  }, [listAppointment]);
  return (
    <div>
      <TableContainer style={{ marginBottom: "30px" }}>
          <TableHeader>
            <h2>Appointment in Today</h2>
            <Link to="/admin/appointments">View All</Link>
          </TableHeader>
          <StyledTableContainer aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Customer</StyledTableCell>
                <StyledTableCell align="right">Phone Number</StyledTableCell>
                <StyledTableCell align="right">Staff</StyledTableCell>
                <StyledTableCell align="right">Service</StyledTableCell>
                <StyledTableCell align="right">Hour</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointmentToday.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                  {row.customer.name || row.customerName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                  {row.customer.phoneNumber || row.phoneNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.staff.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.appointmentType.name}</StyledTableCell>
                  <StyledTableCell align="right"> {format(parseISO(row.date), "h:mm a")}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </StyledTableContainer>
        </TableContainer>
      <Details>
        <TableContainer style={{ marginBottom: "30px" }}>
          <TableHeader>
            <h2>Recent Customers</h2>
            <Link to="/admin/customers">View All</Link>
          </TableHeader>
          <StyledTableContainer aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">BirthDay</StyledTableCell>
                <StyledTableCell align="right">Phone Number</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {formatDate(new Date(row.birth))}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.phoneNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </StyledTableContainer>
        </TableContainer>
        <TableContainer>
          <TableHeader>
            <h2>Today is Birthday</h2>
          </TableHeader>
          <StyledTableContainer aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isBirthday.length > 0 &&
                isBirthday.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton
                        aria-label="show"
                        onClick={() =>
                          navigate(`/admin/customers/${row._id}/show`)
                        }
                      >
                        <RemoveRedEyeIcon
                          sx={{ color: "#999", fontSize: "2rem" }}
                        />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </StyledTableContainer>
        </TableContainer>
      </Details>
    </div>
  );
}
