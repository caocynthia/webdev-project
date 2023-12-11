import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Home() {
  const [topMovies, setMovies] = useState([]);
  const [recentMovies, setRecent] = useState([])
  const top = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzE0NDQ1ZTJhMjFlMmRiYjUzYjY1NjQyNjE3NmY0NSIsInN1YiI6IjY1NzVlZGQ5N2EzYzUyMDE0ZTY5OWVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._1pdIxA6xMlm-YnaNEII4yImoCc0e2UB77IBohSNapk",
    },
  };
  const recent = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzE0NDQ1ZTJhMjFlMmRiYjUzYjY1NjQyNjE3NmY0NSIsInN1YiI6IjY1NzVlZGQ5N2EzYzUyMDE0ZTY5OWVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._1pdIxA6xMlm-YnaNEII4yImoCc0e2UB77IBohSNapk'
    }
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

    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', recent)
      .then(response => response.json())
      .then(response => setRecent(response.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="row">
      <div className="col">
        <h1>Recent Movies</h1>
        <div className="row-3">
            <ul className="list-group">
                {recentMovies.slice(0, 7).map((movie, index) => (
                  <Link className="link" to={`/MovieItem/${movie.id}`} key={index}>
                    <li className="list-group-item">
                      <div>{movie.title}</div>
                      <div>Popularity: {movie.popularity}</div>
                      <div>Vote Average: {movie.vote_average}</div>
                      <img
                        className="movieCards"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </li>
                  </Link>
                ))}
              </ul>
        </div>
      </div>
      <div className="col-2">
        <div className="row">
          <h1>Top 7</h1>
          <ul className="list-group">
            {topMovies.slice(0, 7).map((movie, index) => (
              <div key={movie.id}>
                <Link className="link" to={`/MovieItem/${movie.id}`}>
                  <li className="list-group-item my-1" key={index}>
                    <h6>{movie.title}</h6>
                    <div>Popularity: {movie.popularity}</div>
                    Vote Average: {movie.vote_average}
                    <img
                      className="movieCards"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
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
