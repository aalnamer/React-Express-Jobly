import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./context/UsersContext";

function Home() {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      {currentUser == undefined ? (
        <h1>Welcome to Jobly!</h1>
      ) : (
        <div>
          <h1>
            Welcome back to Jobly,{" "}
            {currentUser.username || currentUser.data.user.username}!
          </h1>
        </div>
      )}
      <h3>Browse through jobs and companies in one convenient place!</h3>
    </div>
  );
}

export default Home;
