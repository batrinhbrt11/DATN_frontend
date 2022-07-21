import { IconButton } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client";
import { URL } from "../App";
import moment from 'moment';
import { useNavigate } from "react-router-dom";

export default function Contacts() {
  const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")) : "";
  const url = URL.replace("api/", "");
  const userId = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).id : null;
  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const messagesEndRef = useRef(null);

  const handleSubmit=(e)=>{
    e.preventDefault();
    if (text.trim().length > 0){
      socket.emit("sendMessage", {
        userId: null,
        msg: text
      });
      if (messages.length === 0){

      }
      else {
        var newMsg = {
          content: text, 
          userId: userId,
          messageId: messages[0].messageDetails[0].messageId,
          createdAt: new Date()
        };
        messages[0].messageDetails.push(newMsg);
      }   
    } 
    setText("");
  }
  const getNewMessage = () => { 
    socket.off("newMessage").on("newMessage", (messages) => {
      console.log("newMsg", messages);
      setMessages(messages);
    })

  }

  const setupSocket = (token, url) => {
    const newSocket = io(`${url}`,
    {
        query: {token},
        transports: ["websocket"],
    });
    setSocket(newSocket);
    getMessages(newSocket);
  }

  const getMessages = (socket) => {
    socket.on("userMessages", (msgs) => {
      console.log("updates", msgs)
      setMessages(msgs);
    });
  }

  const readMessages = (customer, messages) => {
    socket.emit("readMessages", customer);
    messages.forEach(msg => {
      if (msg.userId === customer){
        msg.unreadMsg = 0;
        console.log("msg.unreadMsg", msg.unreadMsg);
      }
    })
    setMessages(messages);
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth"});
  }

  useEffect(() => {
    if (token === null){
      setupSocket(token, url);
    }
  }, []);


  useEffect(() => {
    if (socket !== null){
      if(messages.length === 0){
        getMessages(socket);
      }
      getNewMessage();
    }
    else{
      setupSocket(token, url);
    }
  }, [socket])

  useEffect(() => {
    if (open){
      readMessages(userId, messages);
    }
  }, [open])

  useEffect(() => {
    if (open){
      scrollToBottom()
    }
  }, [messages])
  const navigate = useNavigate()
  const handleToLogin = ()=>{
    navigate("/login");
    setOpen(false);
  }
  return (
    <>
      <Container>
        <IconButton color="primary" onClick={() => setOpen(!open)}>
          <CommentIcon
            style={{ color: "rgb(249, 163, 146) ", fontSize: "30px" }}
          />
        </IconButton>
        { messages[0]?.unreadMsg > 0 ? (<MessageCount>{  messages[0]?.unreadMsg }</MessageCount>) : (null) }
      </Container>
      {open && (

        userId === null ? <ChatBox>
          <Buttonlogin onClick={handleToLogin}>Login to Continue</Buttonlogin>
        </ChatBox>:     <ChatBox>
          <Message>
            {messages[0]?.messageDetails.map((msg, index, element) => {
              if (msg.userId !== userId)   
              return (
                <>
                {index === 0 ? 
                (<DateBox>
                  <p>{moment(msg.createdAt).format("yyyy-MM-dd") !== date? moment(msg.createdAt).format("yyyy-MM-dd") === moment(new Date()).format("yyyy-MM-dd") ? "Today" : moment(msg.createdAt).format("MMM Do YYYY") : ""}</p>
                </DateBox>) :  
                (<DateBox>
                  <p>{moment(msg.createdAt).format("yyyy-MM-dd") !== moment(element[index-1].createdAt).format("yyyy-MM-dd") ? moment(msg.createdAt).format("yyyy-MM-dd") === moment(new Date()).format("yyyy-MM-dd") ? "Today" : moment(msg.createdAt).format("MMM Do YYYY") : ""}</p>
                </DateBox>)
                }
                <AdminMessage key={index}>
                  <MessageBox>
                    <p style={{ color: "#000" }}>
                    { msg.content }
                    </p>
                  </MessageBox>
                  <p style={{marginLeft: "2px",fontFamily:" 'Taviraj', serif "}}>{ moment(msg.createdAt).format('LT') }</p>
                </AdminMessage> 
                
                </>
              ) 
              else 
                return (
                <>
                {index === 0 ? 
                  (<DateBox>
                    <p>{moment(msg.createdAt).format("yyyy-MM-dd") !== date? moment(msg.createdAt).format("yyyy-MM-dd") === moment(new Date()).format("yyyy-MM-dd") ? "Today" : moment(msg.createdAt).format("MMM Do YYYY") : ""}</p>
                  </DateBox>) :  
                  (<DateBox>
                    <p>{moment(msg.createdAt).format("yyyy-MM-dd") !== moment(element[index-1].createdAt).format("yyyy-MM-dd") ? moment(msg.createdAt).format("yyyy-MM-dd") === moment(new Date()).format("yyyy-MM-dd") ? "Today" : moment(msg.createdAt).format("MMM Do YYYY") : ""}</p>
                  </DateBox>)
                  }
                <MyMessage key={index}>
                  <p style={{marginLeft: "2px",fontFamily:" 'Taviraj', serif "}}>{ moment(msg.createdAt).format('LT') }</p>
                  <MessageBox style={{ backgroundColor: "#f9a392" }}>
                    <p>{ msg.content }</p>
                  </MessageBox>
                </MyMessage>
                {() => setDate(moment(msg.createdAt).format("yyyy-MM-dd"))}
                </>       
               )             
            })}
            <div ref={ messagesEndRef }></div> 
          </Message>
          <InputMessage onSubmit={handleSubmit}>
            <input type="text" value = {text} placeholder="Input Message...." onChange={(e)=>setText(e.target.value)} onFocus={() => readMessages(userId, messages)}/>
            <button>
              <SendIcon sx={{ color: "#f9a392", fontSize: "20px" }} />
            </button>
          </InputMessage>
        </ChatBox>
    
      )}
    </>
  );
}
const Buttonlogin=styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
 left: 50%;
  transform: translateX(-50%);
  background-color: #f9a392 ;
  padding: 5px;
  border-radius:14px;
  color: #fff;
  &:hover{
    background-color: #ed8671;
  }

`
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
  position: fixed;
  border-radius: 50%;
  bottom: 5%;
  left: 94%;
  @media (max-width: 1200px) {
left:90vw;
  };

  @media (max-width: 600px) {
left:85vw;
  };
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
  position:fixed;
  bottom: 10%;
  left: 80vw;
  z-index: 20;
  @media (max-width: 1600px) {
left:76vw;
  };

  @media (max-width: 1300px) {
    left:72vw;
  };
  @media (max-width: 1200px) {
left:65vw;
  };
  @media (max-width: 800px) {
left:55vw;
  };
  @media (max-width: 600px) {
left:35vw;
  };
  @media (max-width:400px) {
left:15vw;
  };
  @media (max-width:300px) {
left:0;
  };
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
  & p{
    color: #918886;
    font-size: 12px;
    display: flex;
    align-items: flex-end;
  }
`;
const AdminMessage = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0 5px;
  margin-top: 3px;
  & p{
    color: #918886;
    font-size: 12px;
    display: flex;
    align-items: flex-end;
  }
`;
const MessageBox = styled.div`
  background: #f3f3f3;
  border-radius: 20px;
  padding: 0px 10px;
  color: white;
  display: inline-block;
  max-width: 50%;
  & p {
    color: #fff;
    width: 100%;
    letter-spacing: 0;
    float: left;
    font-size: 1em;
    word-wrap: break-word;
  }
`;
const DateBox = styled.div`
  width: 100%;
  & p {
    color: #918886;
    width: 100%;
    letter-spacing: 0;
    float: left;
    font-size: 1em;
    font-family: 'Taviraj', serif ;
    word-wrap: break-word;
    text-align: center;
  }
`;
const MessageCount= styled.div`
height: 20px;
  width: 20px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%; /* may require vendor prefixes */
  background: #e52b2b;
  position: absolute;
  right: 5px;
  color:#fff;
  bottom:35px;
`;
