import React from "react";
import { ContentContainer } from "../ShareStyled";
import "./style.css";
export default function Voucher() {
  return (
    <div>
      <div className="info-title">
        <h3 style={{ fontWeight: "900" }}>Your Voucher</h3>
      </div>
      <ContentContainer></ContentContainer>
    </div>
  );
}
