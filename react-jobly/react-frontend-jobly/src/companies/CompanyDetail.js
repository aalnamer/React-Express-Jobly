import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import JoblyApi from "../api";
import "./CompanyDetail.css";
import UserContext from "../context/UsersContext";
import { useSelector } from "react-redux";
import { selectUser } from "../reduxData/userSlice";

function CompanyDetail({ id }) {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const { handle } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [companyDetail, setCompanyDetail] = useState();

  const handleSubmit = (apply) => {
    id({ id: apply });
  };

  useEffect(() => {
    async function getCompanies() {
      try {
        let company = await JoblyApi.getCompany(handle);
        setCompanyDetail(company);
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

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const jobs = companyDetail.jobs;

  const jobData = jobs.map((job) => (
    <div key={job.id} className="job-item">
      <div className="job-details">
        <div className="job-detail-row">
          <div className="job-detail-label">ID:</div>
          <div className="job-detail-value">{job.id}</div>
        </div>
        <div className="job-detail-row">
          <div className="job-detail-label">Job Title:</div>
          <div className="job-detail-value">{job.title}</div>
        </div>
        <div className="job-detail-row">
          <div className="job-detail-label">Salary:</div>
          <div className="job-detail-value">{formatter.format(job.salary)}</div>
        </div>
        <div className="job-detail-row">
          <div className="job-detail-label">Equity:</div>
          <div className="job-detail-value">{job.equity}</div>
        </div>
      </div>
      <div className="job-action">
        {user.data.user.applications.includes(job.id) ? (
          <div className="applied-label">Applied</div>
        ) : (
          <button
            className="apply-button"
            value={job.id}
            onClick={() => handleSubmit(job.id)}
          >
            Apply
          </button>
        )}
        <Link to={`/jobs/${job.id}`} key={job.id} className="details-link">
          Job Details
        </Link>
      </div>
    </div>
  ));

  return (
    <div className="company-detail-container">
      <h1 className="company-name">{companyDetail.name}</h1>
      <img
        src={companyDetail.logo}
        alt="Company Logo"
        className="company-logo"
      />
      <p className="company-description">
        Description: {companyDetail.description}
      </p>
      <p className="company-employees">
        We have: {companyDetail.numEmployees} Employees!
      </p>

      <div className="jobs-heading">Jobs Currently Available</div>
      <button className="go-back-button" onClick={() => navigate("/companies")}>
        Go Back
      </button>
      <div className="job-list">{jobData}</div>

      <button className="go-back-button" onClick={() => navigate("/companies")}>
        Go Back
      </button>
    </div>
  );
}

export default CompanyDetail;
