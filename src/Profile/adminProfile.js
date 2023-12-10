import { useParams, useNavigate } from "react-router-dom";
import * as client from "../users/client";
import { useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";
import UserTable from "../users/table";

function AdminProfile() {
  const { id } = useParams();

  const [user, setUser] = useSessionStorage("currentUser");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setUser(user);
      };
      findUserById(id);
    } else {
      const fetchAccount = async () => {
        const account = await client.account();
        setUser(account);
      };
      fetchAccount();
    }
  }, [id, setUser]);

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
