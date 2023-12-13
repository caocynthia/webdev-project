import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as client from "../users/client";
import { useSessionStorage } from "usehooks-ts";
import MovieReviews from "./movieReviews";

function MovieItem() {
  const { movieId } = useParams();
  const [user, setUser] = useSessionStorage("currentUser");
  const navigate = useNavigate();

  const [movie, setMovie] = useState([]);

  const handleLike = async () => {
    try {
      const likedMovies = user.likedMovies;
      likedMovies.push(movieId);
      setUser({ ...user, likedMovies: likedMovies });
      setLiked(true);
      await client.updateUser(user);
    } catch (error) {
      console.error("Error liking movie:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      const updatedLikedMovies = user.likedMovies.filter(
        (id) => id !== movieId
      );
      await client.updateUser({ ...user, likedMovies: updatedLikedMovies });

      setUser({
        ...user,
        likedMovies: updatedLikedMovies,
      });
      setLiked(false);
    } catch (error) {
      console.error("Error unliking movie:", error);
    }
  };

  const [liked, setLiked] = useState(false);

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
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        options
      );
      const data = await response.json();
      setMovie(data);
    };

    setLiked(user.likedMovies.includes(movieId));
    fetchMovies();
  }, [movieId, user.likedMovies]);

  return (
    <div className="">
      <div className="mb-4">
        <div
          className="text-decoration-underline text-primary"
          onClick={() => navigate(-1)}
        >
          ← Back
        </div>
      </div>

      {movie && (
        <div className="d-flex flex-column flex-md-row gap-4 w-100">
          <div className="d-flex flex-column gap-4 pr-4">
            <img
              className="movie-poster col-12 col-sm-8 col-md-12 "
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={"Poster of " + movie.title}
            ></img>

            {user && (
              <div>
                {liked ? (
                  // { liked ?
                  <button className="btn btn-primary" onClick={handleUnlike}>
                    <i className="bi bi-heart-fill"></i> Liked
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={handleLike}>
                    <i className="bi bi-heart"></i> Like
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="movie-item-body d-flex flex-column gap-4 w-100">
            {/* Movie Info */}
            <div>
              <h1>
                {movie.title} | {movie.runtime} min
              </h1>
              <div>{movie.overview}</div>
              <br />
              <h4>Rating: {movie.vote_average}</h4>
            </div>

            <MovieReviews />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieItem;
