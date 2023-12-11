import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as reviewClient from "../reviews/client";

function MovieItem() {
  const { movieId, userId } = useParams();
  const [movie, setMovie] = useState([]);
  const [review, setReview] = useState("");
  const [movieReviews, setMovieReviews] = useState([]);

  const makeReview = async () => {
    // id should be user id
    if (userId) {
      await reviewClient.createUserReviewsMovie(userId, movieId, review);
    }
    setReview("");
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzE0NDQ1ZTJhMjFlMmRiYjUzYjY1NjQyNjE3NmY0NSIsInN1YiI6IjY1NzVlZGQ5N2EzYzUyMDE0ZTY5OWVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._1pdIxA6xMlm-YnaNEII4yImoCc0e2UB77IBohSNapk",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => console.error(err));

    const fetchMovieReviews = async () => {
      const reviews = await reviewClient.findAllReviews();
      const filteredReviews = reviews.filter(
        (review) => review.movieId === movieId
      );
      setMovieReviews(filteredReviews);
    };

    fetchMovieReviews();
  }, [movieId, movie]);

  const navigate = useNavigate();

  return (
    <div className="container p-0">
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
          <div className="pr-4">
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={"Poster of " + movie.Title}
            ></img>
            <button className="btn btn-primary">
              {/* TODO change state based on whether its liked or not */}
              <i className="bi bi-heart"></i> Like
              <i className="bi bi-heart-fill"></i> Liked
            </button>
          </div>
          <div className="movie-item-body d-flex flex-column gap-4 w-100">
            {/* Movie Info */}
            <div>
              <h1>{movie.title} | {movie.runtime} min</h1>
              <div>{movie.overview}</div>
              <br />
              <h4>Rating: {movie.vote_average}</h4>
            </div>

            {/* Reviews */}
            <div className="d-flex flex-column gap-2">
              <div>
                <h1>Reviews</h1>
              </div>
              {userId && (
                <div className="review-textbox">
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  ></textarea>
                  <button onClick={makeReview} className="btn btn-primary">
                    + Add a Review
                  </button>
                </div>
              )}
              <ul className="list-group">
                {movieReviews.map((review, index) => (
                  <li
                    key={index}
                    className="list-group-item card review-card row mt-2 gap-4 g-0"
                  >
                    <h3>{review.username}</h3>
                    <div>{review.review}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieItem;
