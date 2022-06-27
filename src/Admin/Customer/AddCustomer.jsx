import React from "react";
import { TableContainer, TableHeader } from "../Styled";
import CustomersForm from "./CustomersForm";

export default function AddCustomer() {
  return (
    <TableContainer>
      <TableHeader>
        <h2>Add Customers</h2>
      </TableHeader>
      <CustomersForm />
    </TableContainer>
  );
}
