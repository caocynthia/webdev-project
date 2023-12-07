import { fullTextSearch } from "../api/movie-service";
import { useState } from "react";
import { Link } from "react-router-dom";

function SearchMovie() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState();

  const search = async () => {
    const response = await fullTextSearch(searchTerm);
    setResults(response);
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
      <div className="row">
        {results &&
          results.Search.map((movie) => (
            <div key={movie.imdbID} className="card col-2">
              <Link className="link" to={`/MovieItem/${movie.imdbID}`}>
                {console.log(movie.Title)}
                {console.log(movie)}
                <h1 className="searchMovieTitle">{movie.Title}</h1>
                <div>Type: {movie.Type}</div>
                <div>Year: {movie.Year}</div>
                <img className="movieCards" src={movie.Poster} alt={movie.Title}></img>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchMovie;
