import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import JoblyApi from "../api";
import UserContext from "../context/UsersContext";
import { useSelector } from "react-redux";
import { selectUser } from "../reduxData/userSlice";
import "./JobsDetail.css";

function JobDetail() {
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [jobDetail, setJobDetail] = useState();
  console.log(jobDetail);

  useEffect(() => {
    async function getCompanies() {
      try {
        let jobData = await JoblyApi.getJob(id);
        let job = jobData.job;
        setJobDetail(job);
        setIsLoading(false);
      } catch (err) {
        navigate("/notfound");
      }
    }
    getCompanies();
  }, []);

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

  if (isLoading) {
    return <div>Loading ... </div>;
  }

  // Formats Salary to currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="job-detail-container">
      <h1>{jobDetail.title}</h1>
      <h3>Company: {jobDetail.company.name}</h3>
      <p className="company-description">{jobDetail.company.description}</p>
      {jobDetail.equity && <p>Equity: {jobDetail.equity}</p>}
      <p>Salary: {formatter.format(jobDetail.salary)}</p>
      <button
        className="go-back-button"
        onClick={() => {
          navigate("/jobs");
        }}
      >
        Go Back
      </button>
    </div>
  );
}

export default JobDetail;
