import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UsersContext";
import "./Profile.css";

function Profile() {
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

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

  const currentData = currentUser.data.user;

  return (
    <div>
      <h1>Welcome, {currentData.firstName} </h1>
      <div>
        Full Name: {currentData.firstName} {currentData.lastName}
      </div>
      <br></br>
      <div>Username: {currentData.username}</div>
      <br></br>
      <div>Email: {currentData.email}</div>
      <div>
        <br></br>
        Current Applications:{" "}
        <div className="grid-container">
          {currentData.applications.map((job) => (
            <div key={job}>
              <br></br>
              ID: {job}
              <div className="grid-item">
                <Link to={`/jobs/${job}`}>Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        {" "}
        Go Back
      </button>
      <div>
        <br></br>
        <button
          onClick={() => {
            navigate("/profile/edit");
          }}
        >
          {" "}
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
