import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UsersContext";
import "./Profile.css";
import { useSelector } from "react-redux";
import { selectUser } from "../reduxData/userSlice";

function Profile() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  console.log(user == undefined);
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

  const userData = user.data.user;

  return (
    <div className="container">
      <h1 className="heading">Welcome, {userData.firstName}</h1>
      <div className="info-group">
        <div>
          Full Name: {userData.firstName} {userData.lastName}
        </div>
        <div>Username: {userData.username}</div>
        <div>Email: {userData.email}</div>
      </div>
      <div className="button-group">
        <button onClick={() => navigate("/")}>Go Back</button>
        <button onClick={() => navigate("/profile/edit")}>Edit Profile</button>
      </div>

      <div className="applications">
        <h3>Current Applications:</h3>
        <div className="grid-container">
          {userData.applications?.map((job) => (
            <div className="application-item" key={job}>
              <div className="application-id">ID: {job}</div>
              <div className="application-details">
                <Link to={`/jobs/${job}`}>
                  <button className="details-button">Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
