import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as client from "../users/client";
import UserProfile from "./userProfile";
import AdminProfile from "./adminProfile";
import { useSessionStorage } from "usehooks-ts";

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

  const [user, setUser] = useSessionStorage("currentUser");

  const signout = async () => {
    try {
      await client.signout();
      navigate("/");
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-between">
        <h1>Profile</h1>
        <button className="btn btn-danger" onClick={() => signout()}>
          Sign out
        </button>
      </div>

      {/* <Account /> */}
      {account && account.role === "MODERATOR" && (
        <>
          <AdminProfile />
        </>
      )}
      {account && account.role === "USER" && (
        <>
          <UserProfile />
        </>
      )}
    </>
  );
}
export default Profile;
