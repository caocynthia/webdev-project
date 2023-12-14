import { useState } from "react";
import { Link } from "react-router-dom";

function SearchMovie() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [searched, setSearched] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzE0NDQ1ZTJhMjFlMmRiYjUzYjY1NjQyNjE3NmY0NSIsInN1YiI6IjY1NzVlZGQ5N2EzYzUyMDE0ZTY5OWVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._1pdIxA6xMlm-YnaNEII4yImoCc0e2UB77IBohSNapk",
    },
  };

  const fetchSearchedMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=${page}`,
      options
    );
    const data = await response.json();
    setResults(data.results);
    setSearched(true);
  };

  const pageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= 7; i++) {
      pages.push(
        i === page ? (
          <Link
            className="link current-page-num"
            key={i}
            onClick={() => setPage(i)}
          >
            {i}
          </Link>
        ) : (
          <Link className="link page-num" key={i} onClick={() => setPage(i)}>
            {i}
          </Link>
        )
      );
    }
    return pages;
  };

  return (
    <div>
      <h1 className="mb-4">Search Movies</h1>
      <div className="d-flex align-items-center gap-2">
        <input
          type="text"
          value={searchTerm}
          className="form-control"
          placeholder="Search for a movie"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* TODO: deal with case where nothing is searched but user presses search */}
        <Link to={`/Search/${searchTerm}`}>
          <button className="btn btn-primary" onClick={fetchSearchedMovies}>
            <i className="bi bi-search fs-6"></i>
          </button>
        </Link>
      </div>
      <div className="row g-0 pt-4 gap-2">
        {searched && (
          <div className="d-flex gap-2 justify-content-center pb-4">
            {pageNumbers()}
          </div>
        )}

        {results.map((movie) => (
          <div key={movie.id} className="card">
            <Link className="link" to={`/MovieItem/${movie.id}`}>
              <h1 className="searchMovieTitle">{movie.title}</h1>
              <div className="card-subheading">
                Popularity: {movie.popularity}
              </div>
              <div className="card-subheading">
                Release Date: {movie.release_date}
              </div>
              <img
                className="movieCards"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              ></img>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchMovie;
