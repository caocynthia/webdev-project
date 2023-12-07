import React from "react";
import { useParams } from "react-router-dom";
import { findMovieById } from "../api/movie-service";
import { useState, useEffect } from "react";
import * as client from "../api/movie-service"
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

  return (
    <div>
      {console.log(movie)}
      {movie && (
        <div className="row">
          <div className="col"> 
            <img src={movie.Poster}></img>
          </div>
          <div className="col"> 
            <div>{movie.Type} | {movie.Runtime}</div>
            <h1>{movie.Title}</h1>
            <div>{movie.Genre}</div>
            <br/>
            <div>{movie.Plot}</div>
          </div>
          <div className="col">

          </div>
          </div>
      )}
    </div>
  );
}

export default MovieItem;
