import { useParams, useNavigate } from "react-router-dom";
import * as client from "../users/client";
import { useEffect, useState } from "react";

function AdminProfile() {
  const { id } = useParams();

  const [account, setAccount] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "",
  });

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
    if (id) {
      findUserById(id);
    } else {
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
      <p>{account.role}</p>
      <div className="d-flex flex-column w-100 gap-4 mb-4">
        <button
          onClick={() => navigate("/Profile/ProfileEdit/" + id)}
          className="btn btn-primary w-100"
        >
          Edit Profile
        </button>
      </div>
    </>
  );
}
export default AdminProfile;
