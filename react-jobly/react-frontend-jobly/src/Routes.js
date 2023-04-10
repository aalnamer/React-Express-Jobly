import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Redirect, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Companies from "./companies/Companies";
import Jobs from "./jobs/Jobs";
import Login from "./login-signup/Login";
import SignUp from "./login-signup/Signup";
import Profile from "./Profile";
import NotFound from "./NotFound";
import JoblyApi from "./api";
import CompanyDetail from "./companies/CompanyDetail";
import JobDetail from "./jobs/JobsDetail";
import UserContext from "./context/UsersContext";
import LoginForm from "./login-signup/LoginForm";
import LogOut from "./login-signup/LogOut";
import SignUpForm from "./login-signup/SignUpForm";

function SiteRoutes() {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [signUp, setSignUp] = useState();

  const effectRan = useRef(0);
  const signUpRan = useRef(0);

  // Use Effect for Logging In

  useEffect(() => {
    setIsLoading(false);
    effectRan.current = effectRan.current + 1;
    if (effectRan.current === 3) {
      async function loginUser() {
        console.log(currentUser);
        let loginUser = await JoblyApi.login(
          currentUser.username,
          currentUser.password
        );
        localStorage.setItem("token", loginUser.data.token);
        localStorage.setItem("username", currentUser.username);
        setCurrentUser(loginUser);
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
        console.log(user);
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

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  function handleLogin(newLogin) {
    setCurrentUser(newLogin);
  }

  function handleSignUp(newSignUp) {
    setSignUp(newSignUp);
    console.log(signUp, "SIGNUP");
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
        <Route exact path="/logout" element={<LogOut />}></Route>
        <Route exact path="/" element={<Home />}></Route>
        {/* <Route element={<NotFound />}></Route> */}
      </Routes>
    </UserContext.Provider>
  );
}

export default SiteRoutes;
