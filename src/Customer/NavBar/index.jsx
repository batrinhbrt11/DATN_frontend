import React, { useState } from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout, selectToken } from "../../redux/cusAuthSlice";
import { useDispatch } from "react-redux";
export default function () {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    dispatch(logout());
    localStorage.setItem("user", JSON.stringify(null));
    localStorage.setItem("token", JSON.stringify(null));
  };
  const token = useSelector(selectToken);
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          SPA CENTER
        </Link>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              exact="true"
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
              exact="true"
              to="/book"
              activeclassname="active"
              className="nav-links"
              onClick={handleClick}
            >
              Book
            </NavLink>
          </li>

          {token !== null ? (
            <>
              <li className="nav-item">
                <NavLink
                  to="/info"
                  activeclassname="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Account
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className="nav-links"
                  onClick={handleLogout}
                >
                  Log out
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <NavLink to="/login" className="nav-links" onClick={handleClick}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
        <div className="nav-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </div>
    </nav>
  );
}
