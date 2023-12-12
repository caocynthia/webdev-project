import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
function Home() {
  const {userId} = useParams()
  const [topMovies, setMovies] = useState([]);
  const [recentMovies, setRecent] = useState([]);
  const top = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzE0NDQ1ZTJhMjFlMmRiYjUzYjY1NjQyNjE3NmY0NSIsInN1YiI6IjY1NzVlZGQ5N2EzYzUyMDE0ZTY5OWVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._1pdIxA6xMlm-YnaNEII4yImoCc0e2UB77IBohSNapk",
    },
  };
  const recent = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzE0NDQ1ZTJhMjFlMmRiYjUzYjY1NjQyNjE3NmY0NSIsInN1YiI6IjY1NzVlZGQ5N2EzYzUyMDE0ZTY5OWVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._1pdIxA6xMlm-YnaNEII4yImoCc0e2UB77IBohSNapk",
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      top
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((err) => console.error(err));

    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      recent
    )
      .then((response) => response.json())
      .then((response) => setRecent(response.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="d-flex flex-column gap-4">
      <div className="mb-4">
        <h1 className="mb-4">Top 5</h1>
        <div className="d-flex gap-2">
          {topMovies.slice(0, 5).map((movie, index) => (
            <div className="card" key={index}>
              <Link className="link" to={`/MovieItem/${movie.id}/${userId}`}>
                <h5 className="searchMovieTitle">{movie.title}</h5>
                <p>Popularity: {movie.popularity}</p>
                <p>Vote Average: {movie.vote_average}</p>
                <img
                  className="card-img-top"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="section-color col">
        <h1 className="mb-4">Recent Movies</h1>
        <div className="row g-0 gap-2">
          {recentMovies.slice(0, 8).map((movie, index) => (
            <div className="card" key={index}>
              {console.log(userId)}
              <Link className="link" to={`/MovieItem/${movie.id}/${userId}`}>
                <h5 className="searchMovieTitle">{movie.title}</h5>
                <div>
                  <p>Popularity: {movie.popularity}</p>
                  <p>Vote Average: {movie.vote_average}</p>
                </div>
                <img
                  className="card-img-top"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
