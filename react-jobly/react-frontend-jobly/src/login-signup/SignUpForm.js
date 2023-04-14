import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFields from "../hooks/useFields";
import UserContext from "../context/UsersContext";

function SignUpForm({ signUpUser, currentSignUpError }) {
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [formData, handleChange] = useFields({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  if (currentUser != undefined) {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    signUpUser({
      username: formData.username,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    });
    navigate("/");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h1> Sign Up Below! </h1>
          <div style={{ color: "red" }}>{currentSignUpError}</div>
          <label>
            {" "}
            Username
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required={true}
              minLength={1}
              maxLength={30}
            />
          </label>
        </div>
        <p>
          <label>
            {" "}
            First Name
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required={true}
              minLength={5}
              maxLength={20}
            />
          </label>
        </p>
        <p>
          <label>
            {" "}
            Last Name
            <input
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required={true}
              minLength={1}
              maxLength={30}
            />
          </label>
        </p>
        <label>
          {" "}
          Password
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required={true}
            minLength={6}
            maxLength={60}
          />
        </label>
        <p>
          <label>
            {" "}
            Email
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required={true}
            />
          </label>
        </p>

        <p>
          <button>Register</button>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
