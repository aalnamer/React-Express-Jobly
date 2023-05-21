import React, { useContext, useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UsersContext";
import JoblyApi from "../api";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../reduxData/userSlice";
import {
  selectapplicationsItems,
  updateapplicationsItems,
} from "../reduxData/applicationsSlice";

function LoginForm() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const user = useSelector(selectUser);
  console.log(user);
  const currentjobs = useSelector(selectapplicationsItems);
  const [errors, setErrors] = useState({});

  function validateForm() {
    const errors = {};

    if (!usernameValue.trim()) {
      errors.username = "Username is required";
    }

    if (!passwordValue.trim()) {
      errors.password = "Password is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const data = {
    username: usernameValue,
    password: passwordValue,
  };

  async function handleSignIn(e) {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      let res = await JoblyApi.login(data.username, data.password);
      console.log(res.data.token, "SIGNING IN");
      localStorage.setItem("token", res.data.token);
      let user = await JoblyApi.getUser(usernameValue);
      localStorage.setItem("username", user.data.user.username);
      console.log(user.data.user.applications);
      dispatch(login(user.data.user));
      if (user.data.user.applications) {
        dispatch(updateapplicationsItems([...user.data.user.applications]));
      }
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrors({ login: "Invalid username/password" });
      } else {
        console.log(error);
      }
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    const setters = {
      username: setUsernameValue,
      password: setPasswordValue,
    };

    const setter = setters[name];
    if (setter) {
      setter(value);
    }
  }

  if (user != undefined) {
    return (
      <h1>
        {" "}
        Oops, that page isn't Avaliable
        <div>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Go Back
          </button>
        </div>
      </h1>
    );
  }

  // ...
  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSignIn}>
          {errors.username && <div className="error">{errors.username}</div>}
          {errors.password && <div className="error">{errors.password}</div>}
          {errors.login && <div className="error">{errors.login}</div>}
          <input
            name="username"
            value={usernameValue}
            onChange={handleChange}
            placeholder="Username"
          />

          <input
            name="password"
            value={passwordValue}
            onChange={handleChange}
            placeholder="Password"
            type="password"
          />

          <button type="submit">Login</button>
        </form>
        <div> Demo Account: </div>
        <div>Username: demo</div>
        <div>Password: password</div>
      </div>
    </div>
  );
  // ...
}

export default LoginForm;
