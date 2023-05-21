import React, { useState, useEffect, useRef, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import Companies from "./companies/Companies";
import Jobs from "./jobs/Jobs";
import Profile from "./profile/Profile";
import NotFound from "./NotFound";
import JoblyApi from "./api";
import CompanyDetail from "./companies/CompanyDetail";
import JobDetail from "./jobs/JobsDetail";
import UserContext from "./context/UsersContext";
import LoginForm from "./login-signup/LoginForm";
import LogOut from "./login-signup/LogOut";
import SignUpForm from "./login-signup/SignUpForm";
import EditProfileForm from "./profile/ProfileEditForm";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./reduxData/userSlice";
import { updateapplicationsItems } from "./reduxData/applicationsSlice";
import NavBar from "./NavBar";

function SiteRoutes() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  console.log(user);
  const [isLoading, setIsLoading] = useState(true);

  // Use Effect for start up

  useEffect(() => {
    setIsLoading(false);
    async function startUp() {
      if (localStorage.getItem("token")) {
        let startingUser = await JoblyApi.getUser(
          localStorage.getItem("username")
        );
        dispatch(login(startingUser));
        if (startingUser.applications) {
          dispatch(updateapplicationsItems([...startingUser.applications]));
        }
      }
    }
    startUp();
  }, [localStorage.getItem("username")]);

  // Use Effect for Logging In

  // Use Effect for Signing up and Logging In

  // Use Effect for updating profile

  // Use effect for setting job ID

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/companies" element={<Companies />}></Route>
        <Route
          exact
          path="/companies/:handle"
          element={<CompanyDetail />}
        ></Route>
        <Route exact path="/jobs" element={<Jobs />}></Route>
        <Route exact path="/jobs/:id" element={<JobDetail />}></Route>
        <Route exact path="/login" element={<LoginForm />}></Route>

        <Route exact path="/signup" element={<SignUpForm />}></Route>

        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/profile/edit" element={<EditProfileForm />}></Route>

        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default SiteRoutes;
