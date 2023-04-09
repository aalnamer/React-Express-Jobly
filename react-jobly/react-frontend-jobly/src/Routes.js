import React, { useState, useEffect } from "react";
import { Routes, Route, Redirect, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Companies from "./Companies";
import Jobs from "./Jobs";
import Login from "./Login";
import SignUp from "./Signup";
import Profile from "./Profile";
import NotFound from "./NotFound";

function SiteRoutes() {
  return (
    <Routes>
      <Route exact path="/companies" element={<Companies />}></Route>
      <Route exact path="/companies/:name" element={<Companies />}></Route>
      <Route exact path="/jobs" element={<Jobs />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/signup" element={<SignUp />}></Route>
      <Route exact path="/profile" element={<Profile />}></Route>
      <Route exact path="/" element={<Home />}></Route>
      {/* <Route element={<NotFound />}></Route> */}
    </Routes>
  );
}

export default SiteRoutes;
