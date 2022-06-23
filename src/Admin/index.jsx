import React, { useState } from "react";
import NavBar from "./NavBar";
import { AdminContainer, Main, Toggle, TopBar } from "./Styled";
import MenuIcon from "@mui/icons-material/Menu";
import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import Appointment from "./Appointment";
import Customer from "./Customer";
import Services from "./Services";
import AddCustomer from "./Customer/AddCustomer";

export default function () {
  const [showNav, setShowNav] = useState(false);
  return (
    <AdminContainer>
      <NavBar showNav={showNav}></NavBar>
      <Main showNav={showNav}>
        <TopBar>
          <Toggle>
            <MenuIcon
              sx={{ color: "#000", fontSize: "2.5rem" }}
              onClick={() => setShowNav(!showNav)}
            />
          </Toggle>
        </TopBar>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/appointment" element={<Appointment />}></Route>
          <Route path="/customers" element={<Customer />}></Route>
          <Route path="/customers/add" element={<AddCustomer />}></Route>
          <Route path="/services" element={<Services />}></Route>
        </Routes>
      </Main>
    </AdminContainer>
  );
}
