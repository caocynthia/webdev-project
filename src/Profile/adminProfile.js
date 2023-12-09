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
      <div className="row col-sm gap-4">
        <div className="col-md-2 d-flex flex-column gap-2">
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
        </div>
        <div className="col d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <h5>Likes</h5>
            <div className="thing">item here</div>
            <div className="thing">item here</div>
          </div>

          <div className="d-flex flex-column gap-2 mt-4">
            <h5>My Reviews</h5>
            <div className="thing">item here</div>
            <div className="thing">item here</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminProfile;
