import React, { useContext, useState } from "react";
import "./SignUpForm.css";
import { useNavigate } from "react-router-dom";
import useFields from "../hooks/useFields";
import UserContext from "../context/UsersContext";
import { useDispatch } from "react-redux";
import JoblyApi from "../api";
import { login } from "../reduxData/userSlice";
import { updateapplicationsItems } from "../reduxData/applicationsSlice";

function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  const registerData = {
    username: usernameValue,
    password: passwordValue,
    firstName: firstNameValue,
    lastName: lastNameValue,
    email: emailValue,
  };

  async function handleSignIn(event) {
    event.preventDefault();
    try {
      let res = await JoblyApi.signUp(
        registerData.username,
        registerData.password,
        registerData.firstName,
        registerData.lastName,
        registerData.email
      );

      localStorage.setItem("token", res.data.token);
      let user = await JoblyApi.getUser(usernameValue);
      localStorage.setItem("username", user.data.user.username);
      console.log(user);

      dispatch(login(user.data.user));
      if (user.data.user.applications) {
        dispatch(updateapplicationsItems([...user.data.user.applications]));
      }
      navigate("/");
    } catch (err) {
      setFormErrors(err);
      // err?.forEach((error) => {
      //   toast.error(error);
      // });
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    const setters = {
      username: setUsernameValue,
      password: setPasswordValue,
      firstName: setFirstNameValue,
      lastName: setLastNameValue,
      email: setEmailValue,
    };
    const setter = setters[name];
    if (setter) {
      setter(value);
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Create An Account</h1>

        <form onSubmit={handleSignIn}>
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
          <input
            name="firstName"
            value={firstNameValue}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            name="lastName"
            value={lastNameValue}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <input
            name="email"
            value={emailValue}
            onChange={handleChange}
            placeholder="Email"
          />

          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
