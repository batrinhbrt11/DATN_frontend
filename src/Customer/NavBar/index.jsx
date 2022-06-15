import React, { useState } from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

export default function () {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          SPA CENTER
        </Link>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              exact
              to="/"
              activeclassname="active"
              className="nav-links"
              onClick={handleClick}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/book"
              activeclassname="active"
              className="nav-links"
              onClick={handleClick}
            >
              Book
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/login"
              activeclassname="active"
              className="nav-links"
              onClick={handleClick}
            >
              Login
            </NavLink>
          </li>
        </ul>
        <div className="nav-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </div>
    </nav>
  );
}
