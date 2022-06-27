import React from "react";
import { FormContainer, InputBox } from "../Styled";
export default function CustomersForm() {
  return (
    <div>
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

        <InputBox></InputBox>
        <InputBox>
          <input type="submit" value="Save" />
        </InputBox>
      </FormContainer>
    </div>
  );
}
