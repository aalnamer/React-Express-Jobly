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

function SiteRoutes() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [currentError, setCurrentError] = useState();
  const [currentSignUpError, setCurrentSignUpError] = useState();

  const [signUp, setSignUp] = useState();
  const [editUser, setEditUser] = useState();
  const [jobID, setJobID] = useState();

  const effectRan = useRef(0);
  const signUpRan = useRef(0);
  const updateRan = useRef(0);
  const applyRan = useRef(0);

  // Use Effect for start up

  useEffect(() => {
    setIsLoading(false);

    async function startUp() {
      if (localStorage.username) {
        let startingUser = await JoblyApi.getUser(
          localStorage.getItem("username")
        );
        setCurrentUser(startingUser);
        setIsLoading(false);
      }
    }
    startUp();
  }, []);

  // Use Effect for Logging In

  useEffect(() => {
    effectRan.current += 1;
    console.log(effectRan);
    console.log(currentUser, "current user");
    if (effectRan.current === 3 && !currentUser.data) {
      async function loginUser() {
        try {
          console.log("login user initalized");
          let loginUser = await JoblyApi.login(
            currentUser.username,
            currentUser.password
          );

          localStorage.setItem("token", loginUser.data.token);
          localStorage.setItem("username", currentUser.username);
          let userInfo = await JoblyApi.getUser(currentUser.username);
          console.log(effectRan);
          effectRan.current = 0;
          setCurrentUser(userInfo);
          setIsLoading(false);
        } catch (err) {
          setCurrentUser();
          setIsLoading(false);
          setCurrentError("Invalid Username/Password");
          effectRan.current = 1;
          navigate("/login");
        }
      }
      loginUser();
    }
  }, [currentUser]);

  // Use Effect for Signing up and Logging In

  useEffect(() => {
    setIsLoading(false);
    signUpRan.current = signUpRan.current + 1;
    if (signUpRan.current === 3) {
      async function signUpUser() {
        try {
          let user = await JoblyApi.signUp(
            signUp.username,
            signUp.password,
            signUp.firstName,
            signUp.lastName,
            signUp.email
          );
          localStorage.setItem("token", user.data.token);
          localStorage.setItem("username", signUp.username);
          let userInfo = await JoblyApi.getUser(signUp.username);

          setCurrentUser(userInfo);
        } catch (err) {
          setCurrentUser();
          setCurrentSignUpError("Invalid Form: Username/Email Taken");
          navigate("/signup");
        }
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

        let userInfo = await JoblyApi.getUser(editUser.username);

        setCurrentUser(userInfo);
      }
      updateUser();
      return () => {
        updateRan.current = 1;
      };
    }
  }, [editUser]);

  useEffect(() => {
    setIsLoading(false);
  });

  // Use effect for setting job ID

  useEffect(() => {
    setIsLoading(false);
    applyRan.current += 1;
    if (applyRan.current === 3) {
      async function applyForJob() {
        try {
          const username = currentUser.data.user.username;
          const id = +jobID.id;

          let job = await JoblyApi.applyJob(username, id);
          let updateUser = await JoblyApi.getUser(username);

          setCurrentUser(updateUser);
          applyRan.current = 2;
        } catch (err) {
          navigate("/profile");
        }
      }
      applyForJob();
    }
  }, [jobID]);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  function handleID(id) {
    console.log(id);
    setJobID(id);
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
    <Routes>
      <Route exact path="/companies" element={<Companies />}></Route>
      <Route
        exact
        path="/companies/:handle"
        element={<CompanyDetail id={handleID} cantFind="/companies" />}
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
        element={
          <LoginForm loginUser={handleLogin} errorMessage={currentError} />
        }
      ></Route>

      <Route
        exact
        path="/signup"
        element={
          <SignUpForm
            signUpUser={handleSignUp}
            errorMessage={currentSignUpError}
          />
        }
      ></Route>

      <Route exact path="/profile" element={<Profile />}></Route>
      <Route
        exact
        path="/profile/edit"
        element={<EditProfileForm editUser={handleUpdate} />}
      ></Route>
      <Route exact path="/logout" element={<LogOut />}></Route>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default SiteRoutes;
