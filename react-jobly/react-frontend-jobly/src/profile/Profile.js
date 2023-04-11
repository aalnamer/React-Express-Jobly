import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UsersContext";
import JoblyApi from "../api";

function Profile() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState();
  const currentUser = localStorage.getItem("username");
  const user = useContext(UserContext);
  console.log(user, "user data");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      let userProfile = await JoblyApi.getUser(currentUser);
      setUserProfile(userProfile);
      setIsLoading(false);
    }

    getData();
  }, []);

  if (!user) {
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

  if (isLoading) {
    return <div>Loading ... </div>;
  }

  const userData = userProfile.data.user;
  const userApplications = userProfile.data.user.applications;
  console.log(userProfile);
  console.log(userProfile.data.user.applications);

  return (
    <div>
      <h1>Welcome, {userData.firstName} </h1>
      <p>
        Full Name: {userData.firstName} {userData.lastName}
      </p>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>
        Current Applications:{" "}
        {userApplications.map((job) => (
          <p>
            ID: {job}
            <p>
              <Link to={`/jobs/${job}`}>Details</Link>
            </p>
          </p>
        ))}
      </p>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        {" "}
        Go Back
      </button>
      <p>
        <button
          onClick={() => {
            navigate("/profile/edit");
          }}
        >
          {" "}
          Edit Profile
        </button>
      </p>
    </div>
  );
}

export default Profile;
