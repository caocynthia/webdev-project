import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as client from "../users/client";
import UserProfile from "./userProfile";
import AdminProfile from "./adminProfile";
import { useSessionStorage } from "usehooks-ts";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useSessionStorage("currentUser");

  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setUser(user);
  };

  const navigate = useNavigate();

  const fetchAccount = async () => {
    const account = await client.account();
    setUser(account);
  };

  useEffect(() => {
    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
    }
  }, [id]);

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
      <div className="d-flex flex-row justify-content-between mb-4">
        <h1>Profile</h1>
        <div>
          <button className="btn btn-danger" onClick={() => signout()}>
            Sign out
          </button>
        </div>
      </div>

      {/* <Account /> */}
      {user && user.role === "MODERATOR" && (
        <>
          <AdminProfile />
        </>
      )}
      {user && user.role === "USER" && (
        <>
          <UserProfile />
        </>
      )}
    </>
  );
}
export default Profile;
