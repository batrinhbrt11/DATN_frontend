import React from "react";
import Services from "./Services";
import About from "./About";
import Appointment from "./Appointment";
import BigImage from "./BigImage";
import Footer from "./Footer";
import OpenHours from "./OpenHours";
import Pricing from "./Pricing";

export default function Home() {
  return (
    <div>
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
