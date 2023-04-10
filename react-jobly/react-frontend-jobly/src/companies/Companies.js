import React from "react";
import { Link } from "react-router-dom";
import CompanyList from "./CompanyList";

function Companies() {
  return (
    <div>
      <h1>List of Companies!</h1>
      <CompanyList />
    </div>
  );
}

export default Companies;
