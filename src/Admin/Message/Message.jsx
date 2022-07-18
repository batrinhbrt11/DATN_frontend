import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import SendIcon from "@mui/icons-material/Send";
import { getMessage } from './api';
import io from "socket.io-client";
import { URL } from "../../App";
import moment from 'moment';
import CircleIcon from "@mui/icons-material/Circle";

export default function Message({ socket, messages }) {
    const [customer,setCustomer] = useState("")
    //const [messages, setMessages] = useState([]);
    const [customerMsgDetails, setCustomerMsgDetails] = useState([]);
    //const [socket, setSocket] = useState(null);
    const token = JSON.parse(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")) : "";
    const url = URL.replace("api/", "");
    const adminId = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).id : null;
    const [text, setText] = useState("");
    const [newMsg, setMewMsg] = useState(null);
    const [date, setDate] = useState(Date.parse("1970-01-01"));
    const messagesEndRef = useRef(null);

    const handleSubmit=(e)=>{
      e.preventDefault();
      if (text.trim().length > 0){
        socket.emit("sendMessage", {
          userId: customer,
          msg: text
        });
        if (messages.length == 0){
  
        }
        else {
          var newMsg = {
            content: text, 
            userId: adminId,
            messageId: customerMsgDetails[0].messageDetails[0].messageId,
            createdAt: new Date(),
            _id: ""
          };
          console.log("messageId", newMsg.messageId);
          customerMsgDetails[0].messageDetails.push(newMsg);       
        }   
      } 
      setText("");
    }

    const setupSocket = (token, url) => {
      const newSocket = io(`${url}`,
      {
          query: {token},
          transports: ["websocket"],
      });
      return newSocket;
    }

    const getMessages = (socket) => {
      socket.on("userMessages", (msgs) => {
        messages = msgs;
      });
    }

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth"});
    }
    // const getNewMessage = () => {   
    //   socket.off("newMessage").on("newMessage", (messages) => {
    //     setMessages(messages);
    //     console.log("new Messages:", messages); 
    //   })
    //   //customerMsgDetails[0].messageDetails.push(msg); 
    // // }

    const getCustomerMsgDetails = (customerId) => {
      var msgDetails = messages.filter(x => x._id === customerId);
      setCustomerMsgDetails(msgDetails);
      console.log("customerMsgDetails", customerMsgDetails);
      console.log("props.messages", customerMsgDetails);
    }

    const readMessages = (customer, messages) => {
      socket.emit("readMessages", customer);
    }
    
    useEffect(() => {
      if (socket != null && customer != ""){
        readMessages(customer, messages)
      }
    }, [customer])

    useEffect(() => {
      if(messages.length > 0){
        getCustomerMsgDetails(customer);
      }
    }, [customer])
    useEffect(() => {
      if (socket == null){
        socket = setupSocket(token, url);
      }
    }, [])

    useEffect(() => {
      if(customer != ""){
        getCustomerMsgDetails(customer);
        scrollToBottom()
      }
    }, [customer, messages])

    useEffect(() => {
      if(customer != ""){
        scrollToBottom()
      }
    }, [customerMsgDetails])

    useEffect(() => {
      getMessages(socket);
    },[socket])

    // useEffect(() => {
    //   getMessages(socket);
    // }, [socket])

    // useEffect(() => {
    //   if (socket != null){
    //     getMessages(socket);
    //     getNewMessage();
    //   }
    // }, [socket])

    // useEffect(() => {
    //   if (customer != ""){
    //     readMessages(customer, messages);
    //   }
    // }, [customer])

  return (
    <Container>
        <ListCustomer>
          {messages?.map((msg, index) => (
            <button key={msg.message.customerId} onClick={()=>setCustomer(msg.message.customerId)}>
              { msg.name } { msg.unreadMsg > 0 ? (<CircleIcon style={{ color: "#e52b2b" }} />) : (null)}
              </button>
          ))}             
        </ListCustomer>
        { customer && (
             <ChatBox>
             <CustomerInfo>{ customerMsgDetails[0]?.name }</CustomerInfo>
             <MessageContainer>
               {/* send message box */}
               {customerMsgDetails[0]?.messageDetails.map((msg, index, element) => {
                if (msg.userId === customer) 
                
                  return (
                    <>
                    {index == 0 ? 
                    (<DateBox>
                      <p>{moment(msg.createdAt).format("yyyy-MM-dd") != date? moment(msg.createdAt).format("yyyy-MM-dd") == moment(new Date()).format("yyyy-MM-dd") ? "Today" : moment(msg.createdAt).format("MMM Do YYYY") : ""}</p>
                    </DateBox>) :  
                    (<DateBox>
                      <p>{moment(msg.createdAt).format("yyyy-MM-dd") != moment(element[index-1].createdAt).format("yyyy-MM-dd") ? moment(msg.createdAt).format("yyyy-MM-dd") == moment(new Date()).format("yyyy-MM-dd") ? "Today" : moment(msg.createdAt).format("MMM Do YYYY") : ""}</p>
                    </DateBox>)
                    }
                    <AdminMessage key={index}>
                      <MessageBox>
                        <p style={{ color: "#000" }}>
                        { msg.content }
                        </p>
                      </MessageBox>
                      <p style={{marginLeft: "2px"}}>{ moment(msg.createdAt).format('LT') }</p>
                    </AdminMessage> 
                    
                    </>
                  ) 
                  else 
                    return (
                    <>
                    {index == 0 ? 
                      (<DateBox>
                        <p>{moment(msg.createdAt).format("yyyy-MM-dd") != date? moment(msg.createdAt).format("yyyy-MM-dd") == moment(new Date()).format("yyyy-MM-dd") ? "Today" : moment(msg.createdAt).format("MMM Do YYYY") : ""}</p>
                      </DateBox>) :  
                      (<DateBox>
                        <p>{moment(msg.createdAt).format("yyyy-MM-dd") != moment(element[index-1].createdAt).format("yyyy-MM-dd") ? moment(msg.createdAt).format("yyyy-MM-dd") == moment(new Date()).format("yyyy-MM-dd") ? "Today" : moment(msg.createdAt).format("MMM Do YYYY") : ""}</p>
                      </DateBox>)
                      }
                    <MyMessage key={index}>
                      <p style={{marginRight: "2px"}}>{ moment(msg.createdAt).format('LT') }</p>
                      <MessageBox style={{ backgroundColor: "#f9a392" }}>
                        <p>{ msg.content }</p>
                      </MessageBox>
                    </MyMessage>
                    {() => setDate(moment(msg.createdAt).format("yyyy-MM-dd"))}
                    </>       
                   )             
            }
            )}
            <div ref={ messagesEndRef }></div>
             </MessageContainer>
             <InputMessage onSubmit={handleSubmit}>
             <input type="text" value = {text} placeholder="Input Message...." onChange={(e)=>setText(e.target.value)} onFocus={() => readMessages(customer, messages)}/>
               <button>
                 <SendIcon sx={{ color: "#f9a392", fontSize: "20px" }} />
               </button>
             </InputMessage>
           </ChatBox>
        )}
    </Container>
  )
}
const Container = styled.div`
  width: 100%;
  height: 60vh;
  background: var(--white);
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  display: flex;
`;

const ListCustomer = styled.div`
  width: 20%;
  height: 100%;
  background: #f9a392;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  padding: 20px;
  overflow: auto;
  & button {
    width: 100%;
    text-align: left;
    padding: 5px;
    font-size: 1.5rem;
    border-bottom: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
      background-color: #fff;
      color: #f9a392;
      transition: background-color 0.5s ease;
    }
  }
`;

const MessageContainer = styled.div`
  height: calc(100% - 110px);
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

  position: absolute;
  bottom: 0;
  height: 50px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
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
  display: inline-block;
  max-width: 50%;
  & p {
    width: 100%;
    color: white;
    letter-spacing: 0;
    float: left;
    font-size: 1em;
    word-wrap: break-word;
  }
`;
const CustomerInfo = styled.div`
  padding: 5px;
  padding-left: 10px;
  font-weight: 600;
  height: 60px;
  display: flex;
  align-items:center;
  font-size: 2rem;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
  color: #f9a392;
`;
const DateBox = styled.div`
  width: 100%;
  & p {
    color: #918886;
    width: 100%;
    letter-spacing: 0;
    float: left;
    font-size: 1em;
    word-wrap: break-word;
    text-align: center;
  }
`;
