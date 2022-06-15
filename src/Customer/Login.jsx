import React from "react";
import { Container } from "react-bootstrap";
import Logon from "./Logon";
import NavBar from "./NavBar";

export default function Login() {
  return (
    <div>
      <NavBar />
      <Container>
        <Logon />
      </Container>
    </div>
  );
}
