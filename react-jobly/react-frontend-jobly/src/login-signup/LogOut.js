import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LogOut() {
  const history = useNavigate();
  localStorage.clear();

  return <Link to={"/"}>Go Home</Link>;
}

export default LogOut;
