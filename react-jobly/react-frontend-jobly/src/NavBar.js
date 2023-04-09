import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink exact to={"/"}>
        Home
      </NavLink>
      <NavLink exact to={"/companies"}>
        All Companies
      </NavLink>
      <NavLink exact to={"/jobs"}>
        All Jobs
      </NavLink>
      <NavLink exact to={"/login"}>
        Login
      </NavLink>
      <NavLink exact to={"/signup"}>
        Sign Up
      </NavLink>
    </nav>
  );
}

export default NavBar;
