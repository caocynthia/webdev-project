import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Home() {
  const [topMovies, setMovies] = useState([]);

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
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="row">
      <div className="col">
        <h1>Popular Movies</h1>
        <ul className="row"></ul>
      </div>
      <div className="col-2">
        <div className="row">
          <h1>Top 7</h1>
          <ul className="list-group">
            {topMovies.slice(0, 7).map((movie, index) => (
              <div key={movie.id}>
                <Link className="link" to={`/MovieItem/${movie.id}`}>
                  <li className="list-group-item" key={index}>
                    <img
                      className="movieCards"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.name}
                    />
                    <div>{movie.name}</div>
                    <div>Popularity: {movie.popularity}</div>
                    Vote Average: {movie.vote_average}
                  </li>
                </Link>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
