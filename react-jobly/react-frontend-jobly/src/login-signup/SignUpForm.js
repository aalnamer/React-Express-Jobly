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
    const isValid = validateForm();
    if (isValid) {
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
        setFormErrors(err.response?.data?.errors || []);
        // err?.forEach((error) => {
        //   toast.error(error);
        // });
      }
    }
  }
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateForm() {
    const errors = {};

    if (!usernameValue.trim()) {
      errors.username = "Username is required";
    } else if (usernameValue.length < 1 || usernameValue.length > 30) {
      errors.username = "Username should be between 1 and 30 characters";
    }

    if (!passwordValue.trim()) {
      errors.password = "Password is required";
    } else if (passwordValue.length < 5 || passwordValue.length > 20) {
      errors.password = "Password should be between 5 and 20 characters";
    }

    if (!firstNameValue.trim()) {
      errors.firstName = "First Name is required";
    } else if (firstNameValue.length < 1 || firstNameValue.length > 30) {
      errors.firstName = "First Name should be between 1 and 30 characters";
    }

    if (!lastNameValue.trim()) {
      errors.lastName = "Last Name is required";
    } else if (lastNameValue.length < 1 || lastNameValue.length > 30) {
      errors.lastName = "Last Name should be between 1 and 30 characters";
    }

    if (!emailValue.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(emailValue)) {
      errors.email = "Invalid email format";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
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

  console.log(formErrors);
  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Create An Account</h1>

        {Object.entries(formErrors).map(([fieldName, errorMessage]) => (
          <div className="error" key={fieldName}>
            {errorMessage}
          </div>
        ))}
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
