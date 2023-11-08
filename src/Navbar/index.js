import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="d-flex gap-4 p-4">
      <Link to={`/`}>Home</Link>
      <Link to={`/profile`}>Profile</Link>
    </div>
  );
}
export default NavBar;
