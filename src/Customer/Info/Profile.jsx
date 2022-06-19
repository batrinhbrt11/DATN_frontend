import React, { useState } from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import "./style.css";
import styled from "styled-components";
import { ContentContainer } from "../ShareStyled";
export default function Profile() {
  const [edit, setEdit] = useState(false);
  return (
    <div>
      <div className="info-title">
        <h3 style={{ fontWeight: "900" }}>Your Information </h3>
        <Button
          variant="contained"
          endIcon={<EditIcon />}
          className="edit-btn"
          onClick={() => setEdit(!edit)}
        >
          Edit
        </Button>
      </div>
      {edit ? <EditInfo /> : <Information />}
    </div>
  );
}

function EditInfo() {
  return (
    <ContentContainer>
      <Title>Edit your Profile</Title>
      <InfoForm>
        <UserDetails>
          <InputBox>
            <span>Full Name</span>
            <input type="text" placeholder="Enter your name" required />
          </InputBox>
          <InputBox>
            <span>Email</span>
            <input type="text" placeholder="Enter your name" required />
          </InputBox>
          <InputBox>
            <span>Full Name</span>
            <input type="text" placeholder="Enter your name" required />
          </InputBox>
          <InputBox>
            <span>Full Name</span>
            <input type="text" placeholder="Enter your name" required />
          </InputBox>
          <InputBox>
            <span>Birthday</span>
            <input type="date" placeholder="Enter your name" required />
          </InputBox>
          <InputBox>
            <br></br>
            <input type="submit" value="Update" />
          </InputBox>
        </UserDetails>
      </InfoForm>
    </ContentContainer>
  );
}
function Information() {
  return (
    <ContentContainer>
      <Title>Your Profile</Title>
      <InfoForm>
        <UserDetails>
          <InputBox>
            <span>Full Name</span>
            <input type="text" placeholder="Enter your name" disabled />
          </InputBox>
          <InputBox>
            <span>Email</span>
            <input type="text" placeholder="Enter your name" disabled />
          </InputBox>
          <InputBox>
            <span>Full Name</span>
            <input type="text" placeholder="Enter your name" disabled />
          </InputBox>
          <InputBox>
            <span>Full Name</span>
            <input type="text" placeholder="Enter your name" disabled />
          </InputBox>
          <InputBox>
            <span>Birthday</span>
            <input type="date" placeholder="Enter your name" disabled />
          </InputBox>
        </UserDetails>
      </InfoForm>
    </ContentContainer>
  );
}

const InfoForm = styled.form``;
const UserDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 12px 0;
  @media (max-width: 584px) {
    max-height: 290px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 5px;
    }
  }
`;
const InputBox = styled.div`
  margin-bottom: 15px;
  width: calc(100% / 2 - 20px);
  & span {
    display: block;
    font-weight: 500;
    margin-bottom: 5px;
  }
  & input {
    height: 45px;
    width: 100%;
    outline: none;
    font-size: 16px;
    border-radius: 5px;
    padding-left: 15px;
    border: 1px solid #ccc;
    border-bottom-width: 2px;
    transition: all 0.3s ease;
    &:focus,
    &:valid {
      border-color: #9b59b6;
    }
  }
  & input[type="submit"] {
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #f9a392;
  }
  @media (max-width: 584px) {
    margin-bottom: 15px;
    width: 100%;
  }
`;
const Title = styled.h3`
  color: #f9a392;
  font-weight: 700;
`;
