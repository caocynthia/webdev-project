import { Routes, Route } from "react-router";
import Home from "./Home";
import Profile from "./Profile";
import ProfileEdit from "./Profile/ProfileEdit";
import adminProfile from "./Profile/adminProfile";
import MovieItem from "./MovieDetails";
import NavBar from "./Navbar";
import SearchMovie from "./Search";
import LoginPage from "./LoginPage";

function App() {
  return (
    <>
      <NavBar />
      <div className="app page-padding">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Search" element={<SearchMovie />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/admin" element={<adminProfile />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Profile/ProfileEdit" element={<ProfileEdit />} />
          <Route path="/MovieItem/:id" element={<MovieItem />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
