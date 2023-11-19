import { fullTextSearch } from "../api/movie-service";
import { useState } from "react";

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

      {results &&
        results.Search.map((movie) => (
          <div key={movie.imdbID} className="card">
            {/* <Link to={`/project/album-details/${album.id}`}>
              <img src={albumImageUrl(album)} />
              <h2>{album.name}</h2>
            </Link> */}
            {console.log(movie.Title)}
            <h1>{movie.Title}</h1>
          </div>
        ))}
    </div>
  );
}

export default SearchMovie;
