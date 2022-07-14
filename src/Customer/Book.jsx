import React from "react";
import Appointment from "./Appointment";
import Footer from "./Footer";
import OpenHours from "./OpenHours";
import Services from "./Services";
export default function Book() {
  return (
    <div>
      <Services />
      <OpenHours />
      <Appointment />

      <Footer />
    </div>
  );
}
