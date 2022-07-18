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
import { selectUser } from "../redux/cusAuthSlice";

export default function () {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const isAdmin =
  ((user && user.role === "admin") || (user && user.role === "staff"));
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
      {!isAdmin ? (<Contacts />) : (null)}
    </div>
  );
}
