import React, { useEffect, useState } from "react";
import { TableContainer, TableHeader } from "../Styled";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllVoucher } from "../../redux/VoucherSlice";
import VoucherTable from "./VoucherTable";
export default function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.vouchers);
  const [rows, setRows] = useState(data.vouchers);
  useEffect(() => {
    dispatch(getAllVoucher());
  }, [dispatch]);

  useEffect(() => {
    setRows(data.vouchers);
  }, [data]);

  return (
    <TableContainer>
      <TableHeader>
        <h2>Vouchers</h2>
        <Button
          variant="contained"
          className="edit-btn"
          sx={{ fontSize: "2rem" }}
          onClick={() => navigate("/admin/vouchers/add")}
        >
          Add
        </Button>
      </TableHeader>
      <VoucherTable data={rows} user={false} />
    </TableContainer>
  );
}
