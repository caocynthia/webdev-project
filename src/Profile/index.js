import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as client from "../users/client";
import UserProfile from "./userProfile";
import AdminProfile from "./adminProfile";
import Account from "../users/account";

function Profile() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);

  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setAccount(user);
  };

  const navigate = useNavigate();

  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };

  useEffect(() => {
    console.log(id);
    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
    }
  }, [id]);

  const signout = async () => {
    await client.signout();
    navigate("/");
  };

  return (
    <>
      <h1>Profile</h1>
      <Account />
      {account && account.type === "MODERATOR" && (
        <>
          <AdminProfile />
        </>
      )}
      {account && (
        <>
          <UserProfile />
        </>
      )}
      <button className="btn btn-danger" onClick={signout}>
        Sign out
      </button>
    </>
  );
}
export default Profile;
