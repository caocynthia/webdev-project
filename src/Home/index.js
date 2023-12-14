import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";

function Home() {
  const { userId } = useParams();
  const [topMovies, setMovies] = useState([]);
  const [recentMovies, setRecent] = useState([]);

  useEffect(() => {
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

    const fetchTopMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        top
      );
      const data = await response.json();
      setMovies(data.results);
    };
    fetchTopMovies();

    const fetchRecentMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        recent
      );
      const data = await response.json();
      setRecent(data.results);
    };
    fetchRecentMovies();
  }, []);

  const [user, setUser] = useSessionStorage("currentUser");
  const [likedMovies, setLikedMovies] = useState([]);

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
      try {
        let listMovies = [];
        for (let i = 0; i < user.likedMovies.length; i++) {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${user.likedMovies[i]}?language=en-US`,
            options
          );
          const data = await response.json();
          listMovies.unshift(data);
        }
        setLikedMovies(listMovies);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="d-flex flex-column gap-4">
      {user && (
        <div className="d-flex flex-column gap-2 mb-4">
          <h1>Recently Liked Movies</h1>
          <div className="row g-0 gap-2">
            {user.likedMovies.length === 0 &&
              "You haven't liked any movies yet!"}
            {likedMovies.slice(0, 5).map((movie, index) => (
              <div key={index} className="card">
                <Link className="link" to={`/MovieItem/${movie.id}`}>
                  <h5 className="searchMovieTitle">{movie.title}</h5>
                  <div className="card-subheading mb-3">
                    Date: {movie.release_date}
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
      )}
      <div className="mb-4">
        <h1 className="mb-4">Top 5</h1>
        <div className="row g-0 gap-2">
          {topMovies.slice(0, 5).map((movie, index) => (
            <div className="card" key={index}>
              <Link className="link" to={`/MovieItem/${movie.id}`}>
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
        <Link className="link" to="/RecentMovies">
          <h1 className="mb-4">Recent Movies →</h1>
        </Link>
        <div className="row g-0 gap-2">
          {recentMovies.slice(0, 10).map((movie, index) => (
            <div className="card" key={index}>
              {console.log(userId)}
              <Link className="link" to={`/MovieItem/${movie.id}`}>
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
