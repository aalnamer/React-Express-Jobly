import React, { useContext, useEffect, useState } from "react";
import "./ProfileEditForm.css";
import { useNavigate } from "react-router-dom";
import useFields from "../hooks/useFields";
import UserContext from "../context/UsersContext";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../reduxData/userSlice";
import JoblyApi from "../api";

function EditProfileForm() {
  const user = useSelector(selectUser);
  console.log(user);
  const dispatch = useDispatch();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [usernameValue, setUsernameValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsernameValue(user.data.user.username);
      setFirstNameValue(user.data.user.firstName);
      setLastNameValue(user.data.user.lastName);
      setEmailValue(user.data.user.email);
    }
  }, [user]);

  const updateData = {
    username: usernameValue,
    firstName: firstNameValue,
    lastName: lastNameValue,
    email: emailValue,
  };
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      let user = await JoblyApi.updateUser(
        updateData.username,
        updateData.firstName,
        updateData.lastName,
        updateData.email
      );
      console.log(user.data.username);
      localStorage.setItem("username", user.data.username);
      dispatch(login(user.data.username));
    } catch (err) {
      console.log(err);
    }
  }
  if (user == undefined) {
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

  function handleChange(event) {
    const { name, value } = event.target;
    const setters = {
      username: setUsernameValue,
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
    <div className="container">
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <span>Username</span>
          <input
            name="username"
            value={usernameValue}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <span>First Name</span>
          <input
            name="firstName"
            value={firstNameValue}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>
        <div className="form-group">
          <span>Last Name</span>
          <input
            name="lastName"
            value={lastNameValue}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
        <div className="form-group">
          <span>Email</span>
          <input
            name="email"
            value={emailValue}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className="button-group">
          <button type="submit">Update Profile</button>
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
      </form>
    </div>
  );
}
export default EditProfileForm;
