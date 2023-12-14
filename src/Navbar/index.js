import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";
import * as client from "../users/client";
import MobileNav from "./mobileNav";

function NavBar() {
  const [user, setUser] = useSessionStorage("currentUser");
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const foundUser = await client.findUserById(id);
          setUser(foundUser);
        } else {
          const account = await client.account();
          setUser(account);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id, setUser]);

  return (
    <div className="sticky-top">
      <div className="navbar flex-nowrap">
        <div className="d-flex gap-4 align-items-center">
          <Link to={`/`} className="site-name">
            <div className="d-flex gap-2 align-items-center">
              MyMovieList
              <i className="bi bi-camera-reels-fill fs-5"></i>
            </div>
          </Link>
          <Link to={`/Search`}>
            <div className="d-flex gap-2">
              <div className="d-none d-sm-block">Search</div>
              <i className="bi bi-search fs-6"></i>
            </div>
          </Link>
        </div>
        <div className="d-none d-sm-block">
          <div className="d-flex align-items-center gap-4">
            {user && user.role === "MODERATOR" && <Link to={`/Users`}>Users</Link>}
            {user && <Link to={`/Profile/${user._id}`}>
              <div className="d-flex gap-2 align-items-center">
                <i className="bi bi-person-circle fs-4"></i>
                {user.username}
              </div></Link>}
            {!user && <Link to={`/Login`}>Sign in / Sign up</Link>}
          </div>
        </div>
        <div className="d-block d-sm-none">
          {!isMenuOpen &&
            <i className="bi bi-list fs-4" onClick={() => setIsMenuOpen(!isMenuOpen)}></i>}
          {isMenuOpen && <i className="bi bi-x-lg fs-4" onClick={() => setIsMenuOpen(!isMenuOpen)}></i>}
        </div>
      </div>
      {isMenuOpen && <MobileNav />}
    </div>
  );
}

export default NavBar;
