import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <div className="d-flex gap-4">
        <Link to={`/`}>Home</Link>
        <Link to={`/Search`}>Search</Link>
      </div>
      <div className="d-flex gap-4">
        <Link to={`/Login`}>Sign in / Sign up</Link>
      </div>
    </div>
  );
}
export default NavBar;
