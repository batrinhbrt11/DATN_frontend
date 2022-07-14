import React, { useState } from "react";
import NavBar from "./NavBar";
import { AdminContainer, Main, Toggle, TopBar } from "./Styled";
import MenuIcon from "@mui/icons-material/Menu";
import Dashboard from "./Dashboard";
import { Route, Routes, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Customer from "./Customer";
import Services from "./Services";
import AddCustomer from "./Customer/AddCustomer";
import EditCustomer from "./Customer/EditCustomer";
import ShowCustomer from "./Customer/ShowCustomer";
import Voucher from "./Voucher";
import Login from "./Login";
import { selectUser } from "../redux/cusAuthSlice";
import { useSelector } from "react-redux";
import Appointment from "./Appointment/Appointment";
import AddApointment from "./Appointment/AddApointment";
import AddVoucher from "./Voucher/AddVoucher";
import { Button } from "@mui/material";
import Staff from "./Staff";
import AddStaff from "./Staff/AddStaff";
import ShowStaff from "./Staff/ShowStaff";
import ShowVoucher from "./Voucher/ShowVoucher";
import AddServices from "./Services/AddServices";
import ShowServices from "./Services/ShowServices";
import Message from "./Message/Message";

export default function () {
  const [showNav, setShowNav] = useState(false);
  const user = useSelector(selectUser);
  const isAdmin =
    (user && user.role === "admin") || (user && user.role === "staff");
  const navigate = useNavigate();
  return isAdmin ? (
    <AdminContainer>
      <NavBar showNav={showNav} setShowNav={setShowNav}></NavBar>
      <Main showNav={showNav}>
        <TopBar>
          <Toggle>
            <MenuIcon
              sx={{ color: "#000", fontSize: "2.5rem" }}
              onClick={() => setShowNav(!showNav)}
            />
          </Toggle>
          <Button
            sx={{
              color: "black",
              fontSize: "2rem",
              border: "none",
              "&:hover": { border: "none" },
            }}
            variant="outlined"
            startIcon={<ArrowBackIcon sx={{ color: "black" }} />}
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
        </TopBar>
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/appointment" element={<Appointment />}></Route>
            <Route path="/appointment/add" element={<AddApointment />}></Route>
            {/* customer */}
            <Route path="/customers" element={<Customer />}></Route>
            <Route path="/customers/add" element={<AddCustomer />}></Route>
            <Route
              path="/customers/:id/edit"
              element={<EditCustomer />}
            ></Route>
            <Route
              path="/customers/:id/show"
              element={<ShowCustomer />}
            ></Route>
            {/* staffs */}
            <Route path="/staffs" element={<Staff />}></Route>
            <Route path="/staffs/add" element={<AddStaff />}></Route>
            <Route path="/staffs/:id" element={<ShowStaff />}></Route>
            {/* voucher */}
            <Route path="/vouchers" element={<Voucher />}></Route>
            <Route path="/vouchers/add" element={<AddVoucher />}></Route>
            <Route path="/vouchers/:id" element={<ShowVoucher />}></Route>
            {/* services */}
            <Route path="/services" element={<Services />}></Route>
            <Route path="/services/add" element={<AddServices />}></Route>
            <Route path="/services/:id" element={<ShowServices />}></Route>
            {/* services */}
            <Route path="/messages" element={<Message />}></Route>
          </Routes>
        </div>
      </Main>
    </AdminContainer>
  ) : (
    <Login />
  );
}
