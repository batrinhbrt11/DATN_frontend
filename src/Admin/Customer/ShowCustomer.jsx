import { Button } from "@mui/material";
import React from "react";
import { TableContainer, TableHeader } from "../Styled";
import { FormContainer, InputBox } from "../Styled";
import { useNavigate } from "react-router-dom";
export default function ShowCustomer() {
  const navigate = useNavigate();
  return (
    <TableContainer>
      <TableHeader>
        <h2>Customer's Information</h2>
        <Button
          variant="contained"
          className="edit-btn"
          sx={{ fontSize: "2rem" }}
          onClick={() => navigate("/admin/customers/1/edit")}
        >
          Edit
        </Button>
      </TableHeader>
      <FormContainer>
        <InputBox>
          <span>Full Name</span>
          <input type="text" placeholder="Enter your name" disabled />
        </InputBox>
        <InputBox>
          <span>Email</span>
          <input type="text" placeholder="Enter your name" disabled />
        </InputBox>
        <InputBox>
          <span>Phone Number</span>
          <input type="text" placeholder="Enter your name" disabled />
        </InputBox>
        <InputBox>
          <span>Full Name</span>
          <input type="text" placeholder="Enter your name" disabled />
        </InputBox>
        <InputBox></InputBox>
        <InputBox>
          <button>Give a Voucher</button>
        </InputBox>
      </FormContainer>
    </TableContainer>
  );
}
