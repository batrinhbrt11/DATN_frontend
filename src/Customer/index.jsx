import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { selectToken} from "../redux/cusAuthSlice";
import Book from "./Book";
import Contacts from "./Contacts";
import Home from "./Home";
import Info from "./Info";
import Login from "./Login";
import NavBar from "./NavBar";

export default function () {
  const token = useSelector(selectToken);
  return (
    <div style={{position: "relative"}}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/book" element={<Book />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/info"
          element={token === null ? <Login /> : <Info />}
        ></Route>
      </Routes>
      <Contacts />
    </div>
  );
}
