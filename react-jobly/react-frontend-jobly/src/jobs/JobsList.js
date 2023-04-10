import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";
import "./JobList.css";

const BASE_URL = "http://localhost:3001/jobs";

const JobList = () => {
  const data = useAxios(BASE_URL);

  const [search, setSearch] = useState("");

  if (data.isLoading) {
    return <div>Loading ... </div>;
  }
  if (data.error) {
    return <div>Sorry, something went wrong </div>;
  }

  const jobs = data.response.data.jobs;

  //   const companies = data.response.data.companies;

  return (
    <div className="App">
      <div>
        <div className="search">
          <input
            type="text"
            placeholder="Search Name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="list">
          {jobs
            .filter((job) => job.title.toLowerCase().includes(search))
            .map((job) => (
              <Link to={`/jobs/${job.id}`} key={job.id}>
                <p>{job.title}</p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default JobList;
