import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as client from "../users/client";
import UserProfile from "./userProfile";
import AdminProfile from "./adminProfile";
import { useSessionStorage } from "usehooks-ts";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useSessionStorage("currentUser");
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({});

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

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzE0NDQ1ZTJhMjFlMmRiYjUzYjY1NjQyNjE3NmY0NSIsInN1YiI6IjY1NzVlZGQ5N2EzYzUyMDE0ZTY5OWVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._1pdIxA6xMlm-YnaNEII4yImoCc0e2UB77IBohSNapk",
      },
    };

    const fetchMovies = (id) => {
      fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        .then((response) => response.json())
        .then((data) => {
          setMovie(data);
        })
        .catch((err) => console.error(err));
      return movie;
    };

    let listMovies = user.likedMovies.map((movie) => fetchMovies(movie));
    console.log(fetchMovies(user.likedMovies[0]));
    setMovies(listMovies);
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
              {movies.map((movie) => {
                <div key={movie.id} className="card">
                  <Link className="link" to={`/MovieItem/${movie.id}`}>
                    <h6>{movie.title}</h6>
                    <div>Popularity: {movie.popularity}</div>
                    Vote Average: {movie.vote_average}
                    <img
                      className="movieCards"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </Link>
                </div>;
                // <div key={movie.id + user._id} className="card">
                //   <Link className="link" to={`/MovieItem/${movie.id}`}>
                //     <h1 className="searchMovieTitle">{movie.title}</h1>
                //     <div className="card-subheading">
                //       Year: {movie.release_date}
                //     </div>
                //     <img
                //       className="movieCards"
                //       src={movie.Poster}
                //       alt={movie.Title}
                //     ></img>
                //   </Link>
                // </div>
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
