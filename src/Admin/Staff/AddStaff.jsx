import React from "react";
import { TableContainer, TableHeader } from "../Styled";
import FormStaff from "./FormStaff";
export default function AddStaff() {
  return (
    <div>
      <TableContainer>
        <TableHeader>
          <h2>Add Staff</h2>
        </TableHeader>
        <FormStaff />
      </TableContainer>
    </div>
  );
}
