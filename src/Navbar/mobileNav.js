import { Link } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";

function MobileNav() {
  const [user] = useSessionStorage("currentUser");
  return (
    <ul className="px-5 py-3 col-md-3 col-xl-2 d-flex flex-column gap-3 mobile-nav d-block d-sm-none">
      {user && (
        <Link to={`/Profile`} className="w-100">
          <div className="d-flex gap-2 align-items-center">
            <i className="bi bi-person-circle fs-4"></i>
            {user.username}
          </div>
        </Link>
      )}
      {user && user.role === "MODERATOR" && (
        <Link to={`/Users`} className="w-100">
          Users
        </Link>
      )}
      {!user && (
        <Link to={`/Login`} className="w-100">
          Sign in / Sign up
        </Link>
      )}
    </ul>
  );
}
export default MobileNav;
