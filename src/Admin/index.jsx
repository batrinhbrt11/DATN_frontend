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
import EditCustomer from "./Customer/EditCustomer";
import ShowCustomer from "./Customer/ShowCustomer";
import Bill from "./Bill";
import Voucher from "./Voucher";
import AddBill from "./Bill/AddBill";
import Login from "./Login";

export default function () {
  const [showNav, setShowNav] = useState(false);
  return (
    // <AdminContainer>
    //   <NavBar showNav={showNav} setShowNav={setShowNav}></NavBar>
    //   <Main showNav={showNav}>
    //     <TopBar>
    //       <Toggle>
    //         <MenuIcon
    //           sx={{ color: "#000", fontSize: "2.5rem" }}
    //           onClick={() => setShowNav(!showNav)}
    //         />
    //       </Toggle>
    //     </TopBar>
    //     <div style={{ padding: "20px" }}>
    //       <Routes>
    //         <Route path="/" element={<Dashboard />}></Route>
    //         <Route path="/appointment" element={<Appointment />}></Route>
    //         {/* customer */}
    //         <Route path="/customers" element={<Customer />}></Route>
    //         <Route path="/customers/add" element={<AddCustomer />}></Route>
    //         <Route
    //           path="/customers/:id/edit"
    //           element={<EditCustomer />}
    //         ></Route>
    //         <Route
    //           path="/customers/:id/show"
    //           element={<ShowCustomer />}
    //         ></Route>
    //         {/* bill */}
    //         <Route path="/bills" element={<Bill />}></Route>
    //         <Route path="/bills/add" element={<AddBill />}></Route>
    //         <Route path="/bills/:id" element={<ShowCustomer />}></Route>
    //         {/* voucher */}
    //         <Route path="/vouchers" element={<Voucher />}></Route>
    //         <Route path="/vouchers/add" element={<AddCustomer />}></Route>
    //         <Route path="/vouchers/:id" element={<EditCustomer />}></Route>
    //         {/* services */}
    //         <Route path="/services" element={<Services />}></Route>
    //         <Route path="/services/add" element={<AddCustomer />}></Route>
    //         <Route path="/services/:id" element={<EditCustomer />}></Route>
    //       </Routes>
    //     </div>
    //   </Main>
    // </AdminContainer>
    <Login />
  );
}
