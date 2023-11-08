import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>{/* <Route path="/" element={<Home />} /> */}</Routes>
      </div>
    </HashRouter>
  );
}

export default App;
