import React from "react";
import { useParams } from "react-router-dom";
import { movieItem } from "../api/movie-service";
import { useState, useEffect } from "react";

function MovieItem() {
  const { movieID } = useParams();
  const [movie, setMovie] = useState(null);

  const fetchMovie = async () => {
    const response = await movieItem(movieID);
    setMovie(response.movies[0]);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <div>
      {movie && (
        <>
          <h1>{movie.title}</h1>
          {/* <img src={albumImageUrl(album)} /> */}
          {/* <pre>{JSON.stringify(movie, null, 2)}</pre> */}
        </>
      )}
    </div>
  );
}

export default MovieItem;
