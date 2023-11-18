import { fullTextSearch } from "../api/movie-service";
import { useState } from "react";
import { Link } from "react-router-dom";
import Results from "../Results";

function SearchMovie() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);

  const search = async () => {
    const response = await fullTextSearch(searchTerm);
    console.log(response.Search[1]);
    setResults(response.Search);
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

      <button className="btn btn-primary" onClick={search}>
        Search
      </button>

      <Results props={results} />
    </div>
  );
}

export default SearchMovie;
