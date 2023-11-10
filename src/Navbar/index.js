import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <div className="d-flex gap-4">
        <Link to={`/`}>Home</Link>
      </div>
      <Link to={`/profile`}>Profile</Link>
    </div>
  );
}
export default NavBar;
