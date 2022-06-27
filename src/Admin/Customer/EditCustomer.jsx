import React from "react";
import { TableContainer, TableHeader } from "../Styled";
import CustomersForm from "./CustomersForm";

export default function EditCustomer() {
  return (
    <TableContainer>
      <TableHeader>
        <h2>Edit Customers</h2>
      </TableHeader>
      <CustomersForm />
    </TableContainer>
  );
}
