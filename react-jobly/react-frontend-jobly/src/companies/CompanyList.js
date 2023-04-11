import React, { useContext, useState } from "react";
import useAxios from "../hooks/useAxios";
import { Link, useNavigate } from "react-router-dom";
import JoblyApi from "../api";
import UserContext from "../context/UsersContext";

const BASE_URL = "http://localhost:3001/companies";

const CompanyList = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("username");
  const data = useAxios(BASE_URL);
  const [search, setSearch] = useState("");

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

  if (data.isLoading) {
    return <div>Loading ... </div>;
  }
  if (data.error) {
    return <div>Sorry, something went wrong </div>;
  }
  console.log(data);
  const companies = data.response.data.companies;

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
        {companies
          .filter((company) => company.name.toLowerCase().includes(search))
          .map((company) => (
            <Link to={`/companies/${company.handle}`} key={company.handle}>
              <p>{company.name}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CompanyList;
