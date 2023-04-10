import React from "react";
import { useNavigate } from "react-router-dom";
import useFields from "../hooks/useFields";

function SignUpForm({ signUpUser }) {
  const history = useNavigate();

  const [formData, handleChange] = useFields({
    username: "test",
    firstName: "sample",
    lastName: "first",
    password: "password",
    email: "email@email.com",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpUser({
      username: formData.username,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    });
    history("/");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>
          <label>
            {" "}
            Username
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            {" "}
            First Name
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
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
