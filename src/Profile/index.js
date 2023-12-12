import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as client from "../users/client";
import * as reviewClient from "../reviews/client";
import UserProfile from "./userProfile";
import AdminProfile from "./adminProfile";
import { useSessionStorage } from "usehooks-ts";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useSessionStorage("currentUser");
  const [movies, setMovies] = useState([]);
  // const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);

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
    const fetchReviews = async () => {
      try {
        if (user && user._id) {
          const reviewsData = await reviewClient.findMoviesUserReviews(user._id);
          setReviews(reviewsData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setUser(user);
      };
      findUserById(id);
      fetchReviews();
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

    const fetchMovies = () => {
      for (let i = 0; i < user.likedMovies.length; i++) {
        fetch(
          `https://api.themoviedb.org/3/movie/${user.likedMovies[i]}?language=en-US`,
          options
        )
          .then((response) => response.json())
          .then((data) => {
            setMovies([...movies, data]);
          })
          .catch((err) => console.error(err));
      }
    };

    fetchMovies();
  }, [user.likedMovies]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzE0NDQ1ZTJhMjFlMmRiYjUzYjY1NjQyNjE3NmY0NSIsInN1YiI6IjY1NzVlZGQ5N2EzYzUyMDE0ZTY5OWVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._1pdIxA6xMlm-YnaNEII4yImoCc0e2UB77IBohSNapk",
      },
    };

    const fetchMovies = () => {
      if (user && user.likedMovies) {
        for (let i = 0; i < user.likedMovies.length; i++) {
          fetch(
            `https://api.themoviedb.org/3/movie/${user.likedMovies[i]}?language=en-US`,
            options
          )
            .then((response) => response.json())
            .then((data) => {
              setMovies((prevMovies) => [...prevMovies, data]);
            })
            .catch((err) => console.error(err));
        }
      }
    };

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

    fetchMovies();
  }, [id, setUser]);

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
            {console.log(reviews)}
          </div>

          <div className="d-flex flex-column gap-2 mt-4">
            <h5>Liked Movies</h5>
            <div className="d-flex gap-2">
              {user.likedMovies.length === 0 &&
                "You haven't liked any movies yet!"}
              {movies.map((movie, index) => (
                <div key={index} className="card">
                  <Link className="link" to={`/MovieItem/${movie.id}/${id}`}>
                    <h1 className="searchMovieTitle">{movie.title}</h1>
                    <div className="card-subheading mb-3">
                      Year: {movie.release_date}
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
