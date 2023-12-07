import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as client from "../api/movie-service";

function MovieItem() {
  const { id: movieID } = useParams();
  const [movie, setMovie] = useState(null);

  const fetchMovie = async () => {
    const movie = await client.findMovieById(movieID);
    setMovie(movie);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="container p-0">
      <div className="mb-4">
        <a className="" onClick={() => navigate(-1)}>
          ← Back to search
        </a>
      </div>

      {movie && (
        <div className="d-flex flex-column flex-md-row gap-4 w-100">
          <div className="pr-4">
            <img src={movie.Poster}></img>
          </div>

          <div className="movie-item-body d-flex flex-column gap-4 w-100">
            {/* Movie Info */}
            <div>
              <div>
                {movie.Type} | {movie.Runtime}
              </div>
              <h1>{movie.Title}</h1>
              <div>{movie.Genre}</div>
              <br />
              <div>{movie.Plot}</div>
            </div>

            {/* Reviews */}
            <div className="d-flex flex-column gap-2">
              <div>
                <h1>Reviews</h1>
              </div>
              <div>
                <button className="btn btn-primary">+ Add a Review</button>
              </div>
              <div className="row mt-2 gap-4 g-0">
                <div className="card review-card">
                  <div>Username</div>
                  <div>review here aaa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieItem;
