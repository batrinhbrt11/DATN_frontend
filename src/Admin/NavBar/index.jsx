import React, { useEffect, useState } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import { Navigation } from "../Styled";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SpaIcon from "@mui/icons-material/Spa";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import HardwareIcon from "@mui/icons-material/Hardware";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/cusAuthSlice";
import io from "socket.io-client";
import { URL } from "../../App";

export default function ({ showNav, setShowNav, unreadMsgCount }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = (e) => {
    dispatch(logout());
    localStorage.setItem("user", JSON.stringify(null));
    localStorage.setItem("token", JSON.stringify(null));
  };
 
  
  return (
    <Navigation showNav={showNav}>
      <ul>
        <li>
          <Link to="/admin" onClick={() => setShowNav(false)}>
            <span className="title" style={{ fontSize: "2rem" }}>
              SPA CENTER
            </span>
          </Link>
        </li>
        <li>
          <Link to="/admin" onClick={() => setShowNav(false)}>
            <DashboardIcon className="icon" sx={{color:"#fff"}}/>
            <span className="title">Dashboard</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/customers" onClick={() => setShowNav(false)}>
            <GroupIcon className="icon" sx={{color:"#fff"}} />
            <span className="title">Customers</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/appointment" onClick={() => setShowNav(false)}>
            <CalendarMonthIcon className="icon" sx={{color:"#fff"}}/>
            <span className="title">Appointment</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/services" onClick={() => setShowNav(false)}>
            <SpaIcon className="icon" sx={{color:"#fff"}}/>
            <span className="title">Services</span>
          </Link>
        </li>
        {
          user.role === "admin" && (  <li>
            <Link to="/admin/staffs" onClick={() => setShowNav(false)}>
              <HardwareIcon className="icon" sx={{color:"#fff"}}/>
              <span className="title">Staffs</span>
            </Link>
          </li>)
        }
     
        {/* <li>
          <Link to="/admin/bills" onClick={() => setShowNav(false)}>
            <AttachMoneyIcon className="icon" />
            <span className="title">Bill</span>
          </Link>
        </li> */}
        <li>
          <Link to="/admin/vouchers" onClick={() => setShowNav(false)}>
            <CardGiftcardIcon className="icon" sx={{color:"#fff"}}/>
            <span className="title">Voucher</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/messages" onClick={() => setShowNav(false)}>
            <CommentIcon  className="icon" sx={{color:"#fff"}}/>
            <span className="title">Message</span>
            {unreadMsgCount > 0 ? (<div className="message_count">{ unreadMsgCount }</div>) : (null)}
          </Link>
        </li>
        <li>
          <Link to="/" onClick={handleLogout}>
            <ExitToAppIcon className="icon"  sx={{color:"#fff"}}/>
            <span className="title">Log out</span>
          </Link>
        </li>
      </ul>
    </Navigation>
  )
}
