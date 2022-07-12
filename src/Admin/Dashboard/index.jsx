import React, { useEffect, useState } from "react";
import { Details, TableContainer, TableHeader } from "../Styled";

import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell, StyledTableContainer, StyledTableRow } from "../TableStyled";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCustomer,
  selectBirthDayCustomer,
} from "../../redux/CustomerSlice";
import formatDate from "../../lib/formatDate";
import { getIsBirthdayCustomer } from "../Customer/api";
import { IconButton } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.customers);
  const listCustomerBirthday = useSelector(selectBirthDayCustomer);
  const [rows, setRows] = useState(data.customers);
  const [isBirthday, setIsBirthday] = useState([]);
  useEffect(() => {
    dispatch(getAllCustomer());
  }, [dispatch]);
  useEffect(() => {
    setRows(data.customers.slice(0, 5));
  }, [data]);
  useEffect(() => {
    setIsBirthday(listCustomerBirthday);
  }, [listCustomerBirthday]);
  return (
    <div>
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
            <Link to="/admin/customer">View All</Link>
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
