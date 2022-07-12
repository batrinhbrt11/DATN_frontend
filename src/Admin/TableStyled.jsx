import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(249, 163, 146)",
    color: theme.palette.common.white,
    fontSize: "2rem !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "2rem",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export const StyledTableContainer = styled(Table)(({ theme }) => ({
  borderRadius: "16px",
  border: "1px solid rgb(249, 163, 146)",
  marginBottom: "10px",
  width: "100%",
  overflowX: "scroll",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  " @media (max-width: 800px)": {
    margin: 0,
    width: "100%",
    overflowX: "scroll",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
  },
}));
