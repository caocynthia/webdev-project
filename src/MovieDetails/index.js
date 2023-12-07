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
    <div className="">
      <button className="btn btn-primary mb-4" onClick={() => navigate(-1)}>
        ← Back to search
      </button>

      {console.log(movie)}
      {movie && (
        <div className="row">
          <div className="col">
            <img src={movie.Poster}></img>
          </div>
          <div className="col">
            <div>
              {movie.Type} | {movie.Runtime}
            </div>
            <h1>{movie.Title}</h1>
            <div>{movie.Genre}</div>
            <br />
            <div>{movie.Plot}</div>
          </div>
          <div className="col"></div>
        </div>
      )}
    </div>
  );
}

export default MovieItem;
