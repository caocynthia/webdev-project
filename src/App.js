import "./App.css";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Home from "./Home";
import Profile from "./Profile";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
