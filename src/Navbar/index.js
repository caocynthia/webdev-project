import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <Link to={`/`}>Home</Link>
      <Link to={`/profile`}>Profile</Link>
    </div>
  );
}
export default NavBar;
