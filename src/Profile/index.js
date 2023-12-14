import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as client from "../users/client";
import UserProfile from "./userProfile";
import AdminProfile from "./adminProfile";
import { useSessionStorage } from "usehooks-ts";
import UserReviews from "../reviews/userReviews";

function Profile() {
  // const { id } = useParams();
  const [user, setUser] = useSessionStorage("currentUser");
  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();
  // const [error, setError] = useState("");

  const signout = async () => {
    try {
      await client.signout();
      navigate("/");
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   try {
  //     if (id) {
  //       const findUserById = async (id) => {
  //         const user = await client.findUserById(id);
  //         setUser(user);
  //       };
  //       findUserById(id);
  //     } else {
  //       const fetchAccount = async () => {
  //         const account = await client.account();
  //         setUser(account);
  //       };
  //       fetchAccount();
  //     }
  //   } catch (err) {
  //     setError("Access denied.");
  //     console.log(err);
  //   }
  // }, [id, setUser]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzE0NDQ1ZTJhMjFlMmRiYjUzYjY1NjQyNjE3NmY0NSIsInN1YiI6IjY1NzVlZGQ5N2EzYzUyMDE0ZTY5OWVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._1pdIxA6xMlm-YnaNEII4yImoCc0e2UB77IBohSNapk",
      },
    };

    const fetchMovies = async () => {
      let listMovies = [];
      try {
        for (let i = 0; i < user.likedMovies.length; i++) {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${user.likedMovies[i]}?language=en-US`,
            options
          );
          const data = await response.json();
          listMovies.push(data);
        }
      } catch (err) {
        console.log(err);
      }
      setMovies(listMovies);
    };

    try {
      fetchMovies();
    } catch (err) {
      console.log(err);
    }
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
            <UserReviews />
          </div>

          <div className="d-flex flex-column gap-2 mt-4">
            <h5>Liked Movies</h5>
            <div className="row g-0 gap-2">
              {user &&
                user.likedMovies &&
                user.likedMovies.length === 0 &&
                "You haven't liked any movies yet!"}
              {movies.map((movie, index) => (
                <div key={index} className="card">
                  <Link className="link" to={`/MovieItem/${movie.id}`}>
                    <h5 className="searchMovieTitle">{movie.title}</h5>
                    <div className="card-subheading mb-3">
                      Date: {movie.release_date}
                    </div>
                    <img
                      className="card-img-top"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
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
