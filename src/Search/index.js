import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function SearchMovie() {
  const { searching } = useParams();
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

  const fetchSearchedMovies = async (page) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searching}&include_adult=false&language=en-US&page=${page}`,
      options
    );
    const data = await response.json();
    setResults(data.results);
    setSearched(true);
  };

  useEffect(() => {
    console.log(searching);
    fetchSearchedMovies(page);
  }, [page, searching]);

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

  const navigate = useNavigate();

  const handleEnter = () => {
    navigate(`/Search/${searchTerm}`);
    fetchSearchedMovies(page);
    setPage(1);
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
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEnter();
            }
          }}
        />

        <Link to={`/Search/${searchTerm}`}>
          <button
            className="btn btn-primary"
            onClick={() => {
              fetchSearchedMovies(page);
              setPage(1);
            }}
          >
            <i className="bi bi-search fs-6"></i>
          </button>
        </Link>
      </div>
      <div className="row g-0 pt-4 gap-2">
        {searched && searching && (
          <div className="d-flex gap-2 justify-content-center pb-4">
            {pageNumbers()}
          </div>
        )}

        {searching &&
          results.map((movie) => (
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
