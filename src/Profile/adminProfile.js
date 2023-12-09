import { useParams, useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import * as client from "../users/client";
import { useEffect } from "react";

function AdminProfile() {
  const { id } = useParams();

  const [user, setUser] = useSessionStorage("currentUser");
  const navigate = useNavigate();

  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setUser(user);
  };

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

  return (
    <>
      <h5>
        {user.firstName} {user.lastName}
      </h5>
      <p>{user.email}</p>
      <p>{user.role}</p>
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
