import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";

let users = [];
function SignUp() {
  function handleNewUser(newUserObj) {
    const addedUser = [...users, newUserObj];
  }
  return (
    <div>
      <h1>Sign Up Below!</h1>
      <SignUpForm newUser={handleNewUser} />
    </div>
  );
}

export default SignUp;
