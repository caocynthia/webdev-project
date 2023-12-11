import { useParams, useNavigate } from "react-router-dom";
import * as client from "../users/client";
import { useEffect, useState } from "react";

function UserProfile() {
  const { id } = useParams();

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

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setAccount(user);
      };
      findUserById(id);
    } else {
      const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
      };
      fetchAccount();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setAccount(user);
      };
      findUserById(id);
    } else {
      const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
      };
      fetchAccount();
    }
  }, [id]);

  return (
    <>
      <h5>
        {account.firstName} {account.lastName}
      </h5>
      <p>{account.email}</p>
      {!account.firstName && !account.lastName && !account.email && (
        <div className="mb-2">Finish setting up your profile!</div>
      )}
      <div className="d-flex w-100">
        <button
          onClick={() => navigate("/Profile/ProfileEdit/" + id)}
          className="btn btn-primary"
        >
          Edit Profile
        </button>
      </div>
    </>
  );
}
export default UserProfile;
