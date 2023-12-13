import { Routes, Route } from "react-router";
import Home from "./Home";
import Profile from "./Profile";
import ProfileEdit from "./Profile/ProfileEdit";
import MovieItem from "./MovieDetails";
import NavBar from "./Navbar";
import SearchMovie from "./Search";
import LoginPage from "./LoginPage";
import UserTable from "./users/table";
import RecentMovies from "./RecentMovies";

function App() {
  return (
    <>
      <NavBar />
      <div className="app page-padding">
        <Routes>
          {/* <Route path="/:userId" element={<Home />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/Search" element={<SearchMovie />} />
          {/* <Route path="/Search/:userId" element={<SearchMovie />} /> */}
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Profile/:id" element={<Profile />} />
          <Route path="/Login" element={<LoginPage />} />
          {/* <Route path="/Profile/ProfileEdit/:id" element={<ProfileEdit />} /> */}
          <Route path="/Users" element={<UserTable />} />
          {/* <Route path="/MovieItem/:movieId/:userId" element={<MovieItem />} /> */}
          <Route path="/MovieItem/:movieId" element={<MovieItem />} />
          <Route path="/RecentMovies" element={<RecentMovies />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
