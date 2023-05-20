import React, { useContext, useEffect, useState } from "react";
import "./CompaniesList.css";
import useAxios from "../hooks/useAxios";
import { Link, useNavigate } from "react-router-dom";
import JoblyApi from "../api";
import UserContext from "../context/UsersContext";

const CompanyList = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("username");
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getCompanyData() {
      let companies = await JoblyApi.getAllCompanies();
      console.log(companies);
      setData(companies);
    }
    getCompanyData();
  }, []);

  if (!data) {
    return <div>Loading ... </div>;
  }
  if (data.error) {
    return <div>Sorry, something went wrong </div>;
  }

  return (
    <div className="company-list">
      <div className="search">
        <input
          type="text"
          placeholder="Search Name"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid-container">
        {data
          .filter((company) => company.name.toLowerCase().includes(search))
          .map((company) => (
            <Link
              to={`/companies/${company.handle}`}
              key={company.handle}
              className="company-item"
            >
              <div className="company-name">{company.name}</div>
              <div>&rarr;</div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CompanyList;
