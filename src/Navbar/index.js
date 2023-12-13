import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";
import * as client from "../users/client";

function NavBar() {
  const [user, setUser] = useSessionStorage("currentUser");
  const { id } = useParams();

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
    <div className="navbar">
      <div className="d-flex gap-4">
        <Link to={`/`}>Home</Link>
        <Link to={`/Search`}>Search</Link>
      </div>
      <div className="d-flex gap-4">
        {user && user.role === "MODERATOR" && <Link to={`/Users`}>Users</Link>}
        {user && <Link to={`/Profile/${user._id}`}>Profile</Link>}
        {!user && <Link to={`/Login`}>Sign in / Sign up</Link>}
      </div>
    </div>
  );
}

export default NavBar;
