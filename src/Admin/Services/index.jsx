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
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useDispatch, useSelector } from "react-redux";
import { deleteService, getAllService } from "../../redux/serviceSlice";

export default function () {
  const navigate = useNavigate();
  const [openDeleteBox, setopenDeleteBox] = useState(false);
  const [page, setPage] = useState(1);
  const length = useSelector((state) => state.services.length);
  const dispatch = useDispatch();
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
  const handleDelete = () => {
    dispatch(deleteService(itemDelete));
    setopenDeleteBox(false);
  };

  const data = useSelector((state) => state.services);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    dispatch(getAllService());
  }, [dispatch]);
  useEffect(() => {
    setRows(data.services.slice((page - 1) * rowsPerPage, page * rowsPerPage));
  }, [data, page]);
  return (
    <TableContainer>
      <TableHeader>
        <h2>Services</h2>
        <Button
          variant="contained"
          className="edit-btn"
          sx={{ fontSize: "2rem" }}
          onClick={() => navigate("/admin/services/add")}
        >
          Add
        </Button>
      </TableHeader>
      <StyledTableContainer aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Index</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>

              <StyledTableCell align="right">
                <IconButton
                  aria-label="delete"
                  onClick={() => handleClickOpen(row._id)}
                >
                  <DeleteIcon sx={{ color: "#999", fontSize: "2rem" }} />
                </IconButton>
                <IconButton
                  aria-label="show"
                  onClick={() => navigate(`/admin/services/${row._id}`)}
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
            Do you want remove this record ?
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
