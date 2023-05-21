import React from "react";
import "./HomePageBackground.css";

function HomePageBackground() {
  return (
    <div className="back-container">
      <h1> Jobly: Your Gateway to Opportunities</h1>
      <p>
        Your Gateway to Opportunities connects you with your dream job by
        providing a comprehensive database of job listings and companies.
      </p>
      <div className="first-desc">
        <div className="desc-text">
          <h2>Jobly: Your Gateway to Opportunities</h2>
          <p>
            Jobly is your ultimate destination for finding the perfect job. With
            our comprehensive database of job listings and companies, you can
            explore a wide range of career opportunities in one convenient
            place. Whether you're just starting your professional journey or
            looking to make a career change, Jobly provides the resources and
            tools you need to take the next step towards your dream job. Join us
            today and discover the power of Jobly: the place to unlock your
            potential and land your ideal job
          </p>
        </div>
        <div className="image">
          <img alt="jobly" src="https://i.imgur.com/bkiEvgH.jpg" />{" "}
          <img alt="jobly" src="https://i.imgur.com/ppli5pG.jpg" />
        </div>
      </div>
    </div>
  );
}

export default HomePageBackground;
