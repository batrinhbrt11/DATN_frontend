import React, { useState } from "react";
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
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
export default function () {
  const navigate = useNavigate();
  const [openDeleteBox, setopenDeleteBox] = useState(false);

  const handleClickOpen = () => {
    setopenDeleteBox(true);
  };

  const handleClose = () => {
    setopenDeleteBox(false);
  };
  const handleDelete = () => {
    setopenDeleteBox(false);
  };
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
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton aria-label="delete" onClick={handleClickOpen}>
                  <DeleteIcon sx={{ color: "#999", fontSize: "2rem" }} />
                </IconButton>
                <IconButton aria-label="show">
                  <RemoveRedEyeIcon
                    sx={{ color: "#999", fontSize: "2rem" }}
                    onClick={() => navigate("/admin/services/2")}
                  />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </StyledTableContainer>
      <Stack spacing={2}>
        <Pagination count={10} shape="rounded" />
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
