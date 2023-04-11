import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Redirect, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Companies from "./companies/Companies";
import Jobs from "./jobs/Jobs";
import Login from "./login-signup/Login";
import SignUp from "./login-signup/Signup";
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

function SiteRoutes() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [signUp, setSignUp] = useState();
  const [editUser, setEditUser] = useState();

  const effectRan = useRef(0);
  const signUpRan = useRef(0);
  const updateRan = useRef(0);

  // Use Effect for Logging In

  useEffect(() => {
    setIsLoading(false);
    effectRan.current = effectRan.current + 1;
    if (effectRan.current === 3) {
      async function loginUser() {
        let loginUser = await JoblyApi.login(
          currentUser.username,
          currentUser.password
        );

        localStorage.setItem("token", loginUser.data.token);
        localStorage.setItem("username", currentUser.username);
        let userInfo = await JoblyApi.getUser(currentUser.username);

        setCurrentUser(userInfo);
        setIsLoading(false);
      }
      loginUser();

      return () => {
        effectRan.current = 1;
      };
    }
  }, [currentUser]);

  // Use Effect for Signing up and Logging In

  useEffect(() => {
    setIsLoading(false);
    signUpRan.current = signUpRan.current + 1;
    if (signUpRan.current === 3) {
      async function signUpUser() {
        let user = await JoblyApi.signUp(
          signUp.username,
          signUp.password,
          signUp.firstName,
          signUp.lastName,
          signUp.email
        );

        setCurrentUser({
          username: signUp.username,
          password: signUp.password,
        });
      }
      signUpUser();
      return () => {
        signUpRan.current = 1;
      };
    }
  }, [signUp]);

  // Use Effect for updating profile

  useEffect(() => {
    setIsLoading(false);
    updateRan.current = updateRan.current + 1;
    if (updateRan.current === 3) {
      async function updateUser() {
        let user = await JoblyApi.updateUser(
          editUser.username,
          editUser.firstName,
          editUser.lastName,
          editUser.email
        );
        setEditUser(user);
      }
      updateUser();
      return () => {
        updateRan.current = 1;
      };
    }
  }, [editUser]);

  // Use Effect for updating profile

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  function handleLogin(newLogin) {
    setCurrentUser(newLogin);
  }
  function handleUpdate(editUser) {
    setEditUser(editUser);
  }

  function handleSignUp(newSignUp) {
    setSignUp(newSignUp);
  }

  return (
    <UserContext.Provider value={currentUser}>
      <Routes>
        <Route exact path="/companies" element={<Companies />}></Route>
        <Route
          exact
          path="/companies/:handle"
          element={<CompanyDetail cantFind="/companies" />}
        ></Route>
        <Route exact path="/jobs" element={<Jobs />}></Route>
        <Route
          exact
          path="/jobs/:id"
          element={<JobDetail cantFind="/jobs" />}
        ></Route>
        <Route
          exact
          path="/login"
          element={<LoginForm loginUser={handleLogin} />}
        ></Route>

        <Route
          exact
          path="/signup"
          element={<SignUpForm signUpUser={handleSignUp} />}
        ></Route>

        <Route exact path="/profile" element={<Profile />}></Route>
        <Route
          exact
          path="/profile/edit"
          element={<EditProfileForm editUser={handleUpdate} />}
        ></Route>
        <Route exact path="/logout" element={<LogOut />}></Route>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default SiteRoutes;
