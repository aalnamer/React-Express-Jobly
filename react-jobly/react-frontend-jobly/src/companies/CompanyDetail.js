import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import JoblyApi from "../api";
import "./CompanyDetail.css";
import UserContext from "../context/UsersContext";

function CompanyDetail({ id }) {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { handle } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [companyDetail, setCompanyDetail] = useState();
  const [jobID, setJobID] = useState();

  const handleSubmit = (apply) => {
    console.log(apply);
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

  if (!currentUser) {
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
    <div key={job.id} className="grid-container">
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
      {currentUser.data.user.applications.includes(job.id) ? (
        <div style={{ color: "green" }}>Applied </div>
      ) : (
        <button
          value={job.id}
          onClick={() => {
            handleSubmit(job.id);
          }}
        >
          {" "}
          Apply
        </button>
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
