import NavBar from "../Navbar";
import SearchMovie from "./search";
import MovieItem from "../MovieDetails";

function Home() {
  return (
    <>
      <NavBar />
      <div className="page-padding">
        <SearchMovie />
        {/* <div className="input-group rounded">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <span className="input-group-text border-0" id="search-addon">
            <i className="bi bi-search"></i>
          </span>
        </div>

        <h1 className="pt-4">hi</h1>
        <p>this is our project</p> */}
      </div>
    </>
  );
}
export default Home;
