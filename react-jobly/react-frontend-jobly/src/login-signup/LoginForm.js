import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFields from "../hooks/useFields";
import UserContext from "../context/UsersContext";

function LoginForm({ loginUser, errorMessage }) {
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [formData, handleChange] = useFields({
    username: "",
    password: "",
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
    loginUser({
      username: formData.username,
      password: formData.password,
    });
    navigate("/");
  };
  return (
    <div>
      <h1>Login </h1>
      <div style={{ color: "red" }}> {errorMessage} </div>
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
              required={true}
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
