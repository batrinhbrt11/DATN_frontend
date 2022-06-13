import React from "react";
import About from "./About";
import Appointment from "./Appointment";
import BigImage from "./BigImage";
import Footer from "./Footer";
import NavBar from "./NavBar";
import OpenHours from "./OpenHours";
import Pricing from "./Pricing";
import Services from "./Services";
export default function () {
  return (
    <div>
      <NavBar />
      <BigImage />
      <About />
      <Services />
      <Appointment />
      <OpenHours />
      <Pricing />
      <Footer />
    </div>
  );
}
