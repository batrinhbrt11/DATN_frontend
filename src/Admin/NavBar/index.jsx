import React from "react";

import { Navigation } from "../Styled";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SpaIcon from "@mui/icons-material/Spa";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
export default function ({ showNav }) {
  return (
    <Navigation showNav={showNav}>
      <ul>
        <li>
          <Link to="/admin">
            <span className="title">Spa Center</span>
          </Link>
        </li>
        <li>
          <Link to="/admin">
            <DashboardIcon className="icon" />
            <span className="title">Dashboard</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/customers">
            <GroupIcon className="icon" />
            <span className="title">Customers</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/appointment">
            <CalendarMonthIcon className="icon" />
            <span className="title">Appointment</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/services">
            <SpaIcon className="icon" />
            <span className="title">Services</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/bill">
            <AttachMoneyIcon className="icon" />
            <span className="title">Bill</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/bill">
            <CardGiftcardIcon className="icon" />
            <span className="title">Voucher</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <ExitToAppIcon className="icon" />
            <span className="title">Log out</span>
          </Link>
        </li>
      </ul>
    </Navigation>
  );
}
