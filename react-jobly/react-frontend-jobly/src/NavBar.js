import React, { useContext, useEffect, useState } from "react";
import { NavLink, Navigate, Routes, useNavigate } from "react-router-dom";
import "./NavBar.css";
import UserContext from "./context/UsersContext";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./reduxData/userSlice";
import { updateapplicationsItems } from "./reduxData/applicationsSlice";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
function NavBar() {
  const storage = localStorage.getItem("username");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [clicked, setClicked] = useState(false);

  console.log(user);

  function handleSignOut() {
    localStorage.clear();
    dispatch(logout());
    dispatch(updateapplicationsItems([]));
    navigate("/");
  }

  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <h1 onClick={() => navigate("/")} className="navbar-logo">
          Jobly
        </h1>
        <div className="menu-icons">
          {clicked ? (
            <CloseIcon
              style={{ cursor: "pointer" }}
              onClick={() => setClicked(false)}
            />
          ) : (
            <MenuIcon
              style={{ cursor: "pointer" }}
              onClick={() => setClicked(true)}
            />
          )}
        </div>
        <ul className={`nav-menu-items ${clicked ? "active" : ""}`}>
          <li>
            <NavLink exact to={"/"}>
              <HomeIcon className="nav-menu-icon" /> Home
            </NavLink>
          </li>

          {user == undefined ? (
            <>
              <li>
                <NavLink exact to={"/login"}>
                  <LoginIcon className="nav-menu-icon" />
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink exact to={"/signup"}>
                  <HowToRegIcon className="nav-menu-icon" /> Sign Up
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink exact to={"/companies"}>
                  <BusinessIcon className="nav-menu-icon" /> All Companies
                </NavLink>
              </li>
              <li>
                <NavLink exact to={"/jobs"}>
                  <WorkIcon className="nav-menu-icon" /> All Jobs
                </NavLink>
              </li>
              <li>
                <NavLink exact to={"/profile"}>
                  <AccountBoxIcon className="nav-menu-icon" /> {storage}
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleSignOut}>
                  <LogoutIcon className="nav-menu-icon" /> Log Out
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
