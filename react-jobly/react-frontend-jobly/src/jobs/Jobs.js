import React from "react";
import { Link } from "react-router-dom";
import JobList from "./JobsList";

function Jobs() {
  return (
    <div>
      <h1>List of All Jobs!</h1>
      <JobList />
    </div>
  );
}

export default Jobs;
