import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function RecentMovies() {
  const { userId } = useParams();
  const [recentMovies, setRecent] = useState([]);
  const [page, setPage] = useState(1);
  const recent = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzE0NDQ1ZTJhMjFlMmRiYjUzYjY1NjQyNjE3NmY0NSIsInN1YiI6IjY1NzVlZGQ5N2EzYzUyMDE0ZTY5OWVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._1pdIxA6xMlm-YnaNEII4yImoCc0e2UB77IBohSNapk",
    },
  };

  
  const pageNumbers = () => {
    const pages = []
      
    for (let i = 1; i <= 7; i++) {
      pages.push(
        i === page? <Link className="link current-page-num" key={i} onClick={() => setPage(i)}>{i}</Link>
        : <Link className="link page-num" key={i} onClick={() => setPage(i)}>{i}</Link>
      );
    }
    return pages;
  };

  useEffect(() => {
    const fetchRecentMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
        recent
      );
      const data = await response.json();
      setRecent(data.results);
    };
    fetchRecentMovies();
  }, [page]);

  return (
    <div>
      <div className="d-flex flex-column gap-4">
        <div className="section-color col">
          <h1 className="mb-4">Recent Movies</h1>
            <div className="d-flex gap-5 justify-content-center">{pageNumbers()}</div>
          <div className="row g-0 gap-2">
            {recentMovies.map((movie, index) => (
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
    </div>
  );
}

export default RecentMovies;
