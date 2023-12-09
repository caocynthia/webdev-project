import { Link } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";

function NavBar() {
  const [user] = useSessionStorage("currentUser");

  return (
    <div className="navbar">
      <div className="d-flex gap-4">
        <Link to={`/`}>Home</Link>
        <Link to={`/Search`}>Search</Link>
      </div>
      <div className="d-flex gap-4">
        {user && user.role === "MODERATOR" && <Link to={`/Users`}>Users</Link>}
        {user && <Link to={`/Profile/` + user._id}>Profile</Link>}
        {!user && <Link to={`/Login`}>Sign in / Sign up</Link>}
      </div>
    </div>
  );
}
export default NavBar;
