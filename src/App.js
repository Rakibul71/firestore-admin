import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import ErrorPage from "./ErrorPage";
import ToggleButton from "./ToggleButton";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          {/* <Route exact element={<Dashboard />} /> */}
          <Route exact path="/error" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
    // <div>
    //   <ToggleButton />
    // </div>
  );
}

export default App;
