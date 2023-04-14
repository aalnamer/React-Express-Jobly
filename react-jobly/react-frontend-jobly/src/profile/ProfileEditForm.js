import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFields from "../hooks/useFields";
import UserContext from "../context/UsersContext";

function EditProfileForm({ editUser, errorMessage }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const storage = localStorage.getItem("username");
  const navigate = useNavigate();

  const [formData, handleChange] = useFields({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  if (currentUser === undefined) {
    return (
      <div>
        <h1>Please Sign in first</h1>
        <p>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Go Back
          </button>
        </p>
      </div>
    );
  }

  const user = currentUser.data.user;
  console.log(user.username);
  const handleSubmit = (e) => {
    e.preventDefault();
    editUser({
      username: user.username,
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
          <button>Edit</button>
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
