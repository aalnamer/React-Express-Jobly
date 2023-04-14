import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import JoblyApi from "../api";
import UserContext from "../context/UsersContext";

function Login() {
  return (
    <div>
      <h1>Login!</h1>
      <LoginForm />
    </div>
  );
}

export default Login;
