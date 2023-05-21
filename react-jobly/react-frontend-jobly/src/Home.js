import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import UserContext from "./context/UsersContext";
import { useSelector } from "react-redux";
import { selectUser } from "./reduxData/userSlice";
import Background from "./background/Background";
import HomePageBackground from "./background/HomePageBackground";

function Home() {
  const user = useSelector(selectUser);

  return (
    <div className="landing-page">
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
          ) : (
            <div className="home-links">
              <Link to="/login" className="home-button">
                Login
              </Link>
              <Link to="/signup" className="home-button">
                Sign Up
              </Link>
            </div>
          )}
          <div className="image-container">
            <img
              src="https://i.imgur.com/nNXsk6j.jpg"
              alt="Home Image"
              className="home-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
