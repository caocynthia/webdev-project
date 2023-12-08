import { Link } from "react-router-dom";
import { useState } from "react";
import * as client from "../users/client";

function NavBar() {
  const [account, setAccount] = useState(null);

  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };

  return (
    <div className="navbar">
      <div className="d-flex gap-4">
        <Link to={`/`}>Home</Link>
        <Link to={`/Search`}>Search</Link>
      </div>
      <div className="d-flex gap-4">
        {account && <Link to={`/Profile`}>Profile</Link>}
        <Link to={`/Login`}>Sign in / Sign up</Link>
      </div>
    </div>
  );
}
export default NavBar;
