import React from "react";
import { TableContainer, TableHeader } from "../Styled";
import FormVoucher from "./FormVoucher";
export default function AddVoucher() {
  return (
    <div>
      <TableContainer>
        <TableHeader>
          <h2>Add Voucher</h2>
        </TableHeader>
        <FormVoucher />
      </TableContainer>
    </div>
  );
}
