import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFields from "../hooks/useFields";
import UserContext from "../context/UsersContext";

function EditProfileForm({ editUser }) {
  const storage = localStorage.getItem("username");
  const navigate = useNavigate();
  const userData = useContext(UserContext);
  const user = userData.data.user;

  const [formData, handleChange] = useFields({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editUser({
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
        <p></p>
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
        <p>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            {" "}
            Go Back
          </button>
        </p>
      </form>
    </div>
  );
}
export default EditProfileForm;
