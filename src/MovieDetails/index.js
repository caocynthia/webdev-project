import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as client from "../api/movie-service";

function MovieItem() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const movie = await client.findMovieById(id);
      setMovie(movie);
    };
    fetchMovie();
  }, [id]);

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
            <img src={movie.Poster} alt={"Poster of " + movie.Title}></img>
            <button className="btn btn-primary">
              {/* TODO change state based on whether its liked or not */}
              <i class="bi bi-heart"></i> Like
              <i class="bi bi-heart-fill"></i> Liked
            </button>
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
