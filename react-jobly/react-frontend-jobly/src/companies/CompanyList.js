import React, { useContext, useState } from "react";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";
import JoblyApi from "../api";
import UserContext from "../context/UsersContext";

const BASE_URL = "http://localhost:3001/companies";

const CompanyList = () => {
  const test = useContext(UserContext);
  console.log(test, "CONTEXT");
  const data = useAxios(BASE_URL);
  const [search, setSearch] = useState("");

  if (data.isLoading) {
    return <div>Loading ... </div>;
  }
  if (data.error) {
    return <div>Sorry, something went wrong </div>;
  }
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
