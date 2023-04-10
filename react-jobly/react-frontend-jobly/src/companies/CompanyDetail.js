import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import JoblyApi from "../api";

function CompanyDetail({ cantFind }) {
  const { handle } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [companyDetail, setCompanyDetail] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      let company = await JoblyApi.getCompany(handle);
      setCompanyDetail(company);
      setIsLoading(false);
    }
    getCompanies();
  }, []);

  if (!companyDetail) return <Navigate to={cantFind} />;

  return (
    <div>
      <h1>{companyDetail.name}</h1>
      <img src={companyDetail.logo} />
      <p>Description: {companyDetail.description}</p>
      <p>We have: {companyDetail.numEmployees} Employees! </p>
    </div>
  );
}

export default CompanyDetail;
