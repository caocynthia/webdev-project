import "./App.css";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Home from "./Home";
import Profile from "./Profile";
import MovieItem from "./MovieDetails";

function App() {
  return (
    <div className="app">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/MovieItem/:id" element={<MovieItem />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
