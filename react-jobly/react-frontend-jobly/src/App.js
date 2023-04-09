import logo from "./logo.svg";
import "./App.css";
import TestSite from "./TestBackend";
import Route from "./Routes";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";

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
