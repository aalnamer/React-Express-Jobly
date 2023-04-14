import React, { useContext } from "react";
import { NavLink, Navigate, Routes, useNavigate } from "react-router-dom";
import "./NavBar.css";
import UserContext from "./context/UsersContext";

function NavBar() {
  const storage = localStorage.getItem("username");
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log(currentUser, " NAVBAR");
  const logout = () => {
    localStorage.clear();
    setCurrentUser();
    navigate("/");
  };

  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <NavLink exact to={"/"}>
        Home
      </NavLink>
      {currentUser === undefined ? (
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
          <NavLink onClick={logout} exact to={"/"}>
            Log Out
          </NavLink>
        </nav>
      )}
    </nav>
  );
}

export default NavBar;
