import logo from "./logo.svg";
import "./App.css";
import TestSite from "./TestBackend";
import Route from "./Routes";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "./context/UsersContext";

function App() {
  const [currentUser, setCurrentUser] = useState();
  return (
    <div className="App">
      <header>
        <BrowserRouter>
          <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            <NavBar />
            <Route />
          </UserContext.Provider>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
