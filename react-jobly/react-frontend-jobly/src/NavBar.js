import React, { useContext, useEffect } from "react";
import { NavLink, Navigate, Routes, useNavigate } from "react-router-dom";
import "./NavBar.css";
import UserContext from "./context/UsersContext";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./reduxData/userSlice";
import { updateapplicationsItems } from "./reduxData/applicationsSlice";

function NavBar() {
  const storage = localStorage.getItem("username");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  console.log(user);

  function handleSignOut() {
    localStorage.clear();
    dispatch(logout());
    dispatch(updateapplicationsItems([]));
    navigate("/");
  }

  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <NavLink exact to={"/"}>
        Home
      </NavLink>
      {user == undefined ? (
        <nav className="log">
          <NavLink exact to={"/login"}>
            Login
          </NavLink>
          <NavLink exact to={"/signup"}>
            Sign Up
          </NavLink>
        </nav>
      ) : (
        <nav className="log">
          {" "}
          <NavLink exact to={"/companies"}>
            All Companies
          </NavLink>
          <NavLink exact to={"/jobs"}>
            All Jobs
          </NavLink>
          <NavLink exact to={"/profile"}>
            {storage}
          </NavLink>
          <NavLink onClick={handleSignOut}>Log Out</NavLink>
        </nav>
      )}
    </nav>
  );
}

export default NavBar;
