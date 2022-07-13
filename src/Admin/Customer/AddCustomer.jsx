import React from "react";
import { TableContainer, TableHeader } from "../Styled";
import AddForm from "./AddForm";

export default function AddCustomer() {
  return (
    <TableContainer>
      <TableHeader>
        <h2>Add Customers</h2>
      </TableHeader>
      <AddForm />
    </TableContainer>
  );
}
