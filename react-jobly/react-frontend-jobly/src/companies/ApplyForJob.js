// import React, { useState, useEffect, useRef, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import JoblyApi from "../api";

// function ApplyForJob({ id }) {
//   const { currentUser, setCurrentUser } = useContext();
//
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function applyForJob() {
//       try {
//         let job = await JoblyApi.applyForJob(id);
//         let updateUser = await JoblyApi.getUser(currentUser.user.data.username);
//         setCurrentUser(updateUser);
//       } catch (err) {
//         navigate("/notfound");
//       }
//     }
//     applyForJob();
//   }, [id]);
// }

// export default ApplyForJob;
