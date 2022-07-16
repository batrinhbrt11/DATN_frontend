import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SendIcon from "@mui/icons-material/Send";
import { getListCustomer, getMessage } from './api';
export default function Message() {
    const [customer,setCustomer] = useState("")
    const handleSubmit=(e)=>{
        e.preventDefault()
    }
    useEffect(()=>{
        getMessage();
        getListCustomer();
    },[])
  return (
    <Container>
        <ListCustomer>
            <button onClick={()=>setCustomer("abc")}>abc</button>    
        </ListCustomer>
        <ChatBox>
          <MessageContainer>
            {/* send message box */}
            <MyMessage >
              <MessageBox style={{backgroundColor:"#f9a392"}}>
                <p>ádasđsa sadf sadsa asdfsad asadsads aasdsad sadasdas dsad</p>
              </MessageBox>
            </MyMessage>
            {/* tanke message  Box */}
            <AdminMessage>
            <MessageBox>
                <p style={{color:"#000"}}>ádasđsad asdsa dasdsa dsad saedwqdsad qư</p>
              </MessageBox>
            </AdminMessage>
           
          </MessageContainer>
          <InputMessage onSubmit={handleSubmit}>
            <input type="text" placeholder="Input Message...." />
            <button>
              <SendIcon sx={{ color: "#f9a392", fontSize: "20px" }} />
            </button>
          </InputMessage>
        </ChatBox>
    </Container>
  )
}
const Container = styled.div`
    width: 100%;
    height: 60vh;
    background: var(--white);
    box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
    display: flex;
`

const ListCustomer = styled.div`
    width: 20%;
    height: 100%;
    background: #f9a392;
    box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
    padding:20px;
    overflow:auto;
    & button{
        width: 100%;
        text-align: left;
        padding:5px;
        font-size:1.5rem;
        border-bottom:1px solid white;
        &:hover{
            background-color: #fff;
            color:#f9a392;
            transition: background-color 0.5s ease;
        }
    }
`



const MessageContainer = styled.div`
  height: calc(100% - 50px);
  padding:10px;
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

const ChatBox = styled.div`
  height: 100%;
  width: 80%;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  position: sticky;
  bottom: 10%;
  left: 80%;
  z-index: 20;

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
const MyMessage= styled.div`
 display: flex;
    justify-content: flex-end;
    padding: 0 5px;
    margin-top: 3px;
`
const AdminMessage= styled.div`
   display: flex;
   justify-content: flex-start;
   padding: 0 5px;
   margin-top: 3px;
  
`
const MessageBox= styled.div`
    background: #f3f3f3;
    border-radius: 20px;
    padding: 0px 10px;
    color: white;
    display: inline-block;
    max-width: 50%;
    & p{
      width: 100%;
    letter-spacing: 0;
    float: left;
    font-size: 1em;
    word-wrap: break-word;
    }
`
