import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as client from "../users/client";

function NavBar() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "",
    likedMovies: [],
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setAccount(user);
      };
      findUserById();
    } else {
      const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
      };
      fetchAccount();
    }
  }, [id]);

  return (
    <div className="navbar">
      <div className="d-flex gap-4">
        <Link to={`/`}>Home</Link>
        <Link to={`/Search`}>Search</Link>
      </div>
      <div className="d-flex gap-4">
        {account && account.role === "MODERATOR" && (
          <Link to={`/Users`}>Users</Link>
        )}
        {account && <Link to={`/Profile/` + account._id}>Profile</Link>}
        {!account && <Link to={`/Login`}>Sign in / Sign up</Link>}
      </div>
    </div>
  );
}
export default NavBar;
