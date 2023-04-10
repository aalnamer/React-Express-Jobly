import logo from "./logo.svg";
import "./App.css";
import TestSite from "./TestBackend";
import Route from "./Routes";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "./context/UsersContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Route />
      </BrowserRouter>
    </div>
  );
}

export default App;
