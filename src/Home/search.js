import { fullTextSearch } from "../api/movie-service";
import { useState } from "react";
import { Link } from "react-router-dom";

function SearchMovie() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const search = async () => {
    const response = await fullTextSearch(searchTerm);

    if (response.Search === undefined) {
      if (searchTerm === "") {
        setErrorMessage("Please type something before searching!");
      } else {
        setErrorMessage('No movies found for "' + searchTerm + '" :(');
      }
    } else {
      setResults(response.Search);
      setErrorMessage(null);
    }
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <div className="d-flex align-items-center">
        <input
          type="text"
          value={searchTerm}
          className="form-control"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* TODO: deal with case where nothing is searched but user presses search */}
        <button className="btn btn-primary" onClick={search}>
          Search
        </button>
      </div>
      <div className="row g-0 pt-4 gap-4">
        {errorMessage && <div className="mb-2 mt-2">{errorMessage}</div>}

        {results.map((movie) => (
          <div key={movie.imdbID} className="card">
            <Link className="link" to={`/MovieItem/${movie.imdbID}`}>
              <h1 className="searchMovieTitle">{movie.Title}</h1>
              <div className="card-subheading">Type: {movie.Type}</div>
              <div className="card-subheading">Year: {movie.Year}</div>
              <img
                className="movieCards"
                src={movie.Poster}
                alt={movie.Title}
              ></img>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchMovie;
