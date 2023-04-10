import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "./context/UsersContext";
import JoblyApi from "./api";

function Profile() {
  const [userProfile, setUserProfile] = useState();
  const currentUser = localStorage.getItem("username");
  const user = useContext(UserContext);
  const currentToken = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      let userProfile = await JoblyApi.getUser(currentUser);
      setUserProfile(userProfile);
      setIsLoading(false);
    }

    getData();
  }, []);

  if (isLoading) {
    return <div>Loading ... </div>;
  }

  const userData = userProfile.data.user;
  const userApplications = userProfile.applications;
  console.log(userProfile, "PROFILE");
  console.log(!userProfile);

  return (
    <div>
      <h1>Welcome, {userData.firstName} </h1>
      <p>
        Full Name: {userData.firstName} {userData.lastName}
      </p>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Current Applications: {userApplications}</p>
    </div>
  );
}

export default Profile;
