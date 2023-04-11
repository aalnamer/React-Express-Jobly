import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import JoblyApi from "../api";
import "./CompanyDetail.css";
import UserContext from "../context/UsersContext";

function CompanyDetail({ cantFind }) {
  const user = localStorage.getItem("username");
  const context = useContext(UserContext);
  console.log(context, "context data");
  const navigate = useNavigate();
  const { handle } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [companyDetail, setCompanyDetail] = useState();

  useEffect(() => {
    async function getCompanies() {
      let company = await JoblyApi.getCompany(handle);
      setCompanyDetail(company);
      setIsLoading(false);
    }
    getCompanies();
  }, []);

  if (!user) {
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
    <div className="grid-container">
      <div className="head">
        ID
        <div className="grid-item-1"> {job.id}</div>
      </div>
      <div>
        Job Title
        <div className="grid-item-2"> {job.title}</div>
      </div>
      <div>
        Salary
        <div className="grid-item-3">{formatter.format(job.salary)}</div>
      </div>
      <div>
        Equity
        <div className="grid-item-4"> {job.equity}</div>
      </div>
      <div>
        <Link to={`/jobs/${job.id}`} key={job.id}>
          {" "}
          Job Detail
        </Link>
      </div>
      {context.data.user.applications.includes(job.id) ? (
        <div style={{ color: "green" }}>Applied</div>
      ) : (
        <div>Apply</div>
      )}
    </div>
  ));

  return (
    <div>
      <h1>{companyDetail.name}</h1>
      <img src={companyDetail.logo} />
      <p>Description: {companyDetail.description}</p>
      <p>We have: {companyDetail.numEmployees} Employees! </p>

      <div>Jobs Currently Avaliable</div>
      <br></br>
      <div>{jobData}</div>

      <button
        onClick={() => {
          navigate("/companies");
        }}
      >
        {" "}
        Go Back
      </button>
    </div>
  );
}

export default CompanyDetail;
