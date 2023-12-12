import * as client from "./client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";

function UserReviews() {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useSessionStorage("currentUser");

  useEffect(() => {
    const findReviewsByUser = async () => {
      try {
        let reviews = await client.findReviewByUser(user._id);
        setReviews(reviews);
      } catch (err) {
        console.log(err);
      }
    };
    findReviewsByUser();
  }, [user._id]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzE0NDQ1ZTJhMjFlMmRiYjUzYjY1NjQyNjE3NmY0NSIsInN1YiI6IjY1NzVlZGQ5N2EzYzUyMDE0ZTY5OWVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._1pdIxA6xMlm-YnaNEII4yImoCc0e2UB77IBohSNapk",
    },
  };

  const fetchMovies = async (movieId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}}?language=en-US`,
      options
    );
    const data = await response.json();
    return data;
  };

  return (
    <>
      <div className="d-flex flex-column gap-2">
        <h5>My Reviews</h5>
        {reviews.map((review, index) => (
          <div key={index} className="card w-100">
            <Link to={"/MovieItem/" + review.movieId}>
              <h6>{review.movieTitle}</h6>
            </Link>
            <p>{review.review}</p>
          </div>
        ))}
      </div>
    </>
  );
}
export default UserReviews;
