import React from "react";
import { useNavigate } from "react-router-dom";
import useFields from "../hooks/useFields";

function LoginForm({ loginUser }) {
  const history = useNavigate();
  const [formData, handleChange] = useFields({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({
      username: formData.username,
      password: formData.password,
    });
    history("/");
  };
  return (
    <div>
      <h1>Login </h1>
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
          <button>Login</button>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
