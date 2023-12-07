import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <div className="d-flex gap-4">
        <Link to={`/`}>Home</Link>
        <Link to={`/Search`}>Search</Link>
      </div>
      <Link to={`/Profile`}>Profile</Link>
    </div>
  );
}
export default NavBar;
