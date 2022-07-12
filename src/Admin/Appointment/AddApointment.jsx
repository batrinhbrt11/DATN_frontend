import React from "react";
import {
  ButtonBox,
  FormContainer,
  InputBox,
  TableContainer,
  TableHeader,
} from "../Styled";
export default function AddApointment() {
  return (
    <div>
      <TableContainer>
        <TableHeader>
          <h2>Add Appointment</h2>
        </TableHeader>
        <FormContainer>
          <InputBox>
            <span>Full Name</span>
            <input type="text" placeholder="Enter your name" />
          </InputBox>
          <InputBox>
            <span>Email</span>
            <input type="text" placeholder="Enter your name" />
          </InputBox>
          <InputBox>
            <span>Full Name</span>
            <input type="text" placeholder="Enter your name" />
          </InputBox>
          <InputBox>
            <span>Full Name</span>
            <input type="text" placeholder="Enter your name" />
          </InputBox>

          <ButtonBox>
            <input type="submit" value="Save" />
          </ButtonBox>
        </FormContainer>
      </TableContainer>
    </div>
  );
}
