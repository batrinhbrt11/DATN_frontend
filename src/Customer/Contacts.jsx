import { IconButton } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
export default function Contacts() {
  const [open, setOpen] = useState(false);
  const handleSubmit=(e)=>{
    e.preventDefault()
  }
  return (
    <>
      <Container>
        <IconButton color="primary" onClick={() => setOpen(!open)}>
          <CommentIcon
            style={{ color: "rgb(249, 163, 146) ", fontSize: "30px" }}
          />
        </IconButton>
      </Container>
      {open && (
        <ChatBox>
          <Message>
            {/* send message box */}
            <MyMessage>
              <MessageBox style={{ backgroundColor: "#f9a392" }}>
                <p>ádasđsa sadf sadsa asdfsad asadsads aasdsad sadasdas dsad</p>
              </MessageBox>
            </MyMessage>
            {/* tanke message  Box */}
            <AdminMessage>
              <MessageBox>
                <p style={{ color: "#000" }}>
                  ádasđsad asdsa dasdsa dsad saedwqdsad qư
                </p>
              </MessageBox>
            </AdminMessage>
          </Message>

          <InputMessage onSubmit={handleSubmit}>
            <input type="text" placeholder="Input Message...." />
            <button>
              <SendIcon sx={{ color: "#f9a392", fontSize: "20px" }} />
            </button>
          </InputMessage>
        </ChatBox>
      )}
    </>
  );
}
const Message = styled.div`
  height: 250px;
  padding: 10px;
  overflow: auto;
  flex: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
const Container = styled.div`
  background-color: #fff;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  position: sticky;
  border-radius: 50%;
  bottom: 5%;
  left: 94%;
  z-index: 20;
  width: 50px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin-bottom: 0 !important;
`;
const ChatBox = styled.div`
  height: 300px;
  width: 300px;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  position: sticky;
  bottom: 10%;
  left: 80%;
  z-index: 20;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(12.3px);
  -webkit-backdrop-filter: blur(12.3px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 0 !important;
  box-shadow: #f9a392 0px 5px 15px;
`;
const InputMessage = styled.form`
  width: 100%;
  border-top: 1px solid #f9a392;
  position: absolute;
  bottom: 0;
  height: 50px;
  display: flex;
  & input {
    background-color: transparent;
    height: 100%;
    width: 80%;

    padding: 5px;
    &:focus {
      outline: none;
    }
  }
  & button {
    width: 20%;

    &:hover {
      background-color: #f9a392;
    }
    &:hover svg {
      color: #fff;
    }
  }
`;
const MyMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 5px;
  margin-top: 3px;
`;
const AdminMessage = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0 5px;
  margin-top: 3px;
`;
const MessageBox = styled.div`
  background: #f3f3f3;
  border-radius: 20px;
  padding: 0px 10px;
  color: white;
  display: inline-block;
  max-width: 50%;
  & p {
    width: 100%;
    letter-spacing: 0;
    float: left;
    font-size: 1em;
    word-wrap: break-word;
  }
`;
