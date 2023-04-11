import React from "react";
import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>The page you're looking for doesn't exist.</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        {" "}
        Go Back
      </button>
    </div>
  );
}

export default NotFound;
