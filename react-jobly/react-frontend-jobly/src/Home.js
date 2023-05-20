import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import UserContext from "./context/UsersContext";
import { useSelector } from "react-redux";
import { selectUser } from "./reduxData/userSlice";

function Home() {
  const user = useSelector(selectUser);
  console.log(user);

  return (
    <div className="home-container">
      <div className="home-content">
        {!user ? (
          <h1 className="home-title">Welcome to Jobly!</h1>
        ) : (
          <div>
            <h1 className="home-title">
              Welcome back to Jobly, {user?.data?.user?.username || ""}!
            </h1>
          </div>
        )}
        <h3 className="home-description">
          Browse through jobs and companies in one convenient place!
        </h3>
        {user ? (
          <div className="home-links">
            <Link to="/jobs" className="home-button">
              Browse Jobs
            </Link>
            <Link to="/companies" className="home-button">
              Browse Companies
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
