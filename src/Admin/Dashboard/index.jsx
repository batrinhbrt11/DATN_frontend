import React from "react";
import {
  Card,
  CardBox,
  CardName,
  CardNumber,
  Details,
  TableContainer,
  TableHeader,
} from "../Styled";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PeopleIcon from "@mui/icons-material/People";
import SpaIcon from "@mui/icons-material/Spa";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell, StyledTableRow } from "../TableStyled";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
export default function () {
  return (
    <div>
      <CardBox>
        <Card>
          <div>
            <CardNumber>1,504</CardNumber>
            <CardName>Customers</CardName>
          </div>
          <PeopleIcon
            className="iconBx"
            sx={{ color: "#999", fontSize: "100px" }}
          />
        </Card>
        <Card>
          <div>
            <CardNumber>1,504</CardNumber>
            <CardName>Receipt</CardName>
          </div>

          <ReceiptIcon
            className="iconBx"
            sx={{ color: "#999", fontSize: "100px" }}
          />
        </Card>

        <Card>
          <div>
            <CardNumber>1,504</CardNumber>
            <CardName>Services</CardName>
          </div>

          <SpaIcon
            className="iconBx"
            sx={{ color: "#999", fontSize: "100px" }}
          />
        </Card>

        <Card>
          <div>
            <CardNumber>1,504</CardNumber>
            <CardName>Earning</CardName>
          </div>
          <div>
            <LocalAtmIcon
              className="iconBx"
              sx={{ color: "#999", fontSize: "100px" }}
            />
          </div>
        </Card>
      </CardBox>
      <Details>
        <TableContainer>
          <TableHeader>
            <h2>Recent Customers</h2>
            <Link to="/admin/customer">View All</Link>
          </TableHeader>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                <StyledTableCell align="right">Calories</StyledTableCell>
                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">
                  Protein&nbsp;(g)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer>
          <TableHeader>
            <h2>Recent Customers</h2>
            <Link to="/admin/customer">View All</Link>
          </TableHeader>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                <StyledTableCell align="right">Calories</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.calories}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Details>
    </div>
  );
}
