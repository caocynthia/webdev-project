import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as client from "../users/client";
import UserProfile from "./userProfile";
import AdminProfile from "./adminProfile";
import { useSessionStorage } from "usehooks-ts";
import * as movieService from "../api/movie-service";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useSessionStorage("currentUser");
  const [movies, setMovies] = useState([""]);

  const navigate = useNavigate();

  const signout = async () => {
    try {
      await client.signout();
      navigate("/");
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setUser(user);
      };
      findUserById(id);
    } else {
      const fetchAccount = async () => {
        const account = await client.account();
        setUser(account);
      };
      fetchAccount();
    }
  }, [id, setUser]);

  // const fetchMovies = async () => {
  //   let movies = [];
  //   for (let i = 0; i < user.likedMovies.length; i++) {
  //     movies = [
  //       ...movies,
  //       await movieService.findMovieById(user.likedMovies[i]),
  //     ];
  //   }
  //   setMovies(() => movies);
  // };

  useEffect(() => {
    const fetchMovies = async () => {
      let movies = [];
      for (let i = 0; i < user.likedMovies.length; i++) {
        movies = [
          ...movies,
          await movieService.findMovieById(user.likedMovies[i]),
        ];
      }
      setMovies(() => movies);
    };

    fetchMovies();
  }, [user.likedMovies]);

  return (
    <>
      <div className="d-flex flex-row justify-content-between mb-4">
        <h1>Profile</h1>
        <div>
          <button className="btn btn-danger" onClick={() => signout()}>
            Sign out
          </button>
        </div>
      </div>

      <div className="row col-sm gap-4">
        <div className="col-md-3 col-xl-2 d-flex flex-column gap-2">
          {/* <Account /> */}
          {user && user.role === "MODERATOR" && (
            <>
              <AdminProfile />
            </>
          )}
          {user && user.role === "USER" && (
            <>
              <UserProfile />
            </>
          )}
        </div>
        <div className="col d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <h5>My Reviews</h5>
            <div className="thing">item here</div>
            <div className="thing">item here</div>
          </div>

          <div className="d-flex flex-column gap-2 mt-4">
            <h5>Liked Movies</h5>
            <div className="row g-0 gap-2">
              {user.likedMovies.length === 0 &&
                "You haven't liked any movies yet!"}
              {movies.map((movie) => (
                <div key={movie.imdbID + user._id} className="card">
                  <Link className="link" to={`/MovieItem/${movie.imdbID}`}>
                    <h1 className="searchMovieTitle">{movie.Title}</h1>
                    <div className="card-subheading">Type: {movie.Type}</div>
                    <div className="card-subheading">Year: {movie.Year}</div>
                    <img
                      className="movieCards"
                      src={movie.Poster}
                      alt={movie.Title}
                    ></img>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
