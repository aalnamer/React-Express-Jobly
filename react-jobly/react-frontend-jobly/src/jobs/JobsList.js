import React, { useContext, useState } from "react";
import "./JobsList.css";
import useAxios from "../hooks/useAxios";
import { Link, useNavigate } from "react-router-dom";
import "./JobList.css";
import UserContext from "../context/UsersContext";
import { useSelector } from "react-redux";
import { selectUser } from "../reduxData/userSlice";

const BASE_URL = "http://localhost:3001/jobs";

function JobList() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const data = useAxios(BASE_URL);

  const [search, setSearch] = useState("");

  if (user == undefined) {
    return (
      <div>
        <h1>Please Sign in first</h1>
        <p>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Go Back
          </button>
        </p>
      </div>
    );
  }
  if (data.isLoading) {
    return <div>Loading ... </div>;
  }
  if (data.error) {
    return <div>Sorry, something went wrong </div>;
  }

  const jobs = data.response.data.jobs;

  //   const companies = data.response.data.companies;

  return (
    <div className="job-list">
      <div className="search">
        <input
          type="text"
          placeholder="Search Name"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <br></br>
      <div className="grid-container">
        {jobs
          .filter((job) => job.title.toLowerCase().includes(search))
          .map((job) => (
            <Link to={`/jobs/${job.id}`} key={job.id} className="job-item">
              <div className="job-name">{job.title}</div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default JobList;
