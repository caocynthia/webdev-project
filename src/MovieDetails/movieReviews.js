import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as reviewClient from "../reviews/client";
import { useSessionStorage } from "usehooks-ts";

function MovieReviews() {
  const { movieId } = useParams();
  const [user] = useSessionStorage("currentUser");

  const [movie, setMovie] = useState([]);

  const [movieReviews, setMovieReviews] = useState([]);

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
    fetchMovies();

    const fetchMovieReviews = async () => {
      const reviews = await reviewClient.findAllReviews();
      const filteredReviews = reviews.filter(
        (review) => review.movieId === movieId
      );
      setMovieReviews(filteredReviews);
    };
    fetchMovieReviews();
  }, [movieId, movie]);

  const [isEditing, setIsEditing] = useState(false);

  const [newReview, setNewReview] = useState({
    userId: "",
    username: "",
    movieId: "",
    movieTitle: "",
    review: "",
  });

  const createReview = async () => {
    try {
      const review = await reviewClient.createReview(newReview);
      setMovieReviews([...movieReviews, review]);
      setIsEditing(false);
      setNewReview({ ...newReview, review: "" });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await reviewClient.deleteReview(reviewId);
      setMovieReviews(movieReviews.filter((r) => r._id !== reviewId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Reviews */}
      <div className="d-flex flex-column mt-4">
        <div>
          <h1>Reviews</h1>
        </div>
        {user && (
          <div className="d-flex flex-column gap-2">
            {isEditing === false && (
              <div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary"
                >
                  + Add a Review
                </button>
              </div>
            )}
            {isEditing === true && (
              <div className="d-flex flex-column justify-content-right mb-4 gap-2">
                <textarea
                  className="form-control" placeholder="Type your review..."
                  value={newReview.review}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      userId: user._id,
                      username: user.username,
                      movieId: movie.id,
                      movieTitle: movie.title,
                      review: e.target.value,
                    })
                  }
                ></textarea>
                <div>
                  <button className="btn btn-primary" onClick={createReview}>
                    Post Review
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <ul className="list-group">
          {movieReviews.map((review, index) => (
            <li
              key={index}
              className="list-group-item card review-card row mt-2 gap-4 g-0"
            >
              <div className="d-flex justify-content-between">
                <Link to={"/Profile/View/" + review.userId}>
                  <h5>{review.username}</h5>
                </Link>
                {user && user.role === "MODERATOR" && (
                  <i
                    className="bi bi-trash fs-6 text-primary"
                    onClick={() => deleteReview(review._id)}
                  ></i>
                )}
              </div>

              <div>{review.review}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default MovieReviews;
