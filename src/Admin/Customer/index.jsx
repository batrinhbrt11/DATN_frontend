import React, { useEffect, useState } from "react";
import { TableContainer, TableHeader } from "../Styled";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
} from "../TableStyled";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, getAllCustomer } from "../../redux/CustomerSlice";
import formatDate from "../../lib/formatDate";

export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDeleteBox, setopenDeleteBox] = useState(false);
  const [page, setPage] = useState(1);
  const length = useSelector((state) => state.customers.length);
  const rowsPerPage = 10;
  const [itemDelete, setItemDelete] = useState("");
  const handleClickOpen = (id) => {
    setItemDelete(id);
    setopenDeleteBox(true);
  };

  const handleClose = () => {
    setItemDelete("");
    setopenDeleteBox(false);
  };
  const handleDelete = async () => {
    dispatch(deleteCustomer(itemDelete));
    setopenDeleteBox(false);
  };

  const data = useSelector((state) => state.customers);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    dispatch(getAllCustomer());
  }, [dispatch]);
  useEffect(() => {
    setRows(data.customers.slice((page - 1) * rowsPerPage, page * rowsPerPage));
  }, [data, page]);
  return (
    <TableContainer>
      <TableHeader>
        <h2>Customers</h2>
        <Button
          variant="contained"
          className="edit-btn"
          sx={{ fontSize: "2rem" }}
          onClick={() => navigate("/admin/customers/add")}
        >
          Add
        </Button>
      </TableHeader>
      <StyledTableContainer aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">BirthDay</StyledTableCell>
            <StyledTableCell align="right">Phone Number</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>

            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {formatDate(new Date(row.birth))}
              </StyledTableCell>
              <StyledTableCell align="right">{row.phoneNumber}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>

              <StyledTableCell align="right">
                <IconButton
                  aria-label="edit"
                  onClick={() => navigate(`/admin/customers/${row._id}/edit`)}
                >
                  <ModeEditIcon sx={{ color: "#999", fontSize: "2rem" }} />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleClickOpen(row._id)}
                >
                  <DeleteIcon sx={{ color: "#999", fontSize: "2rem" }} />
                </IconButton>
                <IconButton
                  aria-label="show"
                  onClick={() => navigate(`/admin/customers/${row._id}/show`)}
                >
                  <RemoveRedEyeIcon sx={{ color: "#999", fontSize: "2rem" }} />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTableContainer>
      <Stack spacing={2}>
        <Pagination
          count={rows && Math.ceil(length / rowsPerPage)}
          shape="rounded"
          onChange={(e, value) => setPage(value)}
        />
      </Stack>
      <Dialog
        open={openDeleteBox}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: "2.5rem", color: "rgb(222, 64, 33) !important" }}
        >
          {"Allert "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: "2.5rem" }}
          >
            Do you want to remove this record ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}
