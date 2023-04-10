import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import JoblyApi from "../api";

function JobDetail({ cantFind }) {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [jobDetail, setJobDetail] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      let jobData = await JoblyApi.getJob(id);
      let job = jobData.job;
      console.log(job);
      setJobDetail(job);
      setIsLoading(false);
    }
    getCompanies();
  }, []);
  if (isLoading) {
    return <div>Loading ... </div>;
  }

  // Formats Salary to currency

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (!jobDetail) return <Navigate to={cantFind} />;

  return (
    <div>
      <h1>{jobDetail.title}</h1>
      <h3>Company: {jobDetail.company.name}</h3>
      {jobDetail.equity ? <p>Equity: {jobDetail.equity}</p> : null}
      <p>Salary: {formatter.format(jobDetail.salary)}</p>
    </div>
  );
}

export default JobDetail;
