import { fullTextSearch } from "../api/movie-service";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function SearchMovie() {
  const {userId} = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzE0NDQ1ZTJhMjFlMmRiYjUzYjY1NjQyNjE3NmY0NSIsInN1YiI6IjY1NzVlZGQ5N2EzYzUyMDE0ZTY5OWVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._1pdIxA6xMlm-YnaNEII4yImoCc0e2UB77IBohSNapk'
    }
  };

  const search = async () => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => {setResults(response.results)})
    .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <div className="d-flex align-items-center gap-2">
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
        {results.map((movie) => (
          <div key={movie.id} className="card">
            <Link className="link" to={`/MovieItem/${movie.id}/${userId}`}>
              <h1 className="searchMovieTitle">{movie.title}</h1>
              <div className="card-subheading">Popularity: {movie.popularity}</div>
              <div className="card-subheading">Release Date: {movie.release_date}</div>
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
