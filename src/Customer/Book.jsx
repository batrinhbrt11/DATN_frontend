import React from "react";
import About from "./About";
import Appointment from "./Appointment";
import Footer from "./Footer";
import NavBar from "./NavBar";
import OpenHours from "./OpenHours";
import Services from "./Services";
export default function Book() {
  return (
    <div>
      <NavBar />
      <Services />
      <OpenHours />
      <Appointment />

      <Footer />
    </div>
  );
}
