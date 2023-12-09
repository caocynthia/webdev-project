import { useParams, useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import * as client from "../users/client";
import { useEffect } from "react";

function UserProfile() {
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
      <div className="row">
        <div className="col-3 d-flex flex-column gap-2">
          <h5>
            {user.firstName} {user.lastName}
          </h5>
          <p>{user.email}</p>
          <div className="d-flex w-100">
            <button
              onClick={() => navigate("/Profile/ProfileEdit/" + id)}
              className="btn btn-primary"
            >
              Edit Profile
            </button>
          </div>
        </div>
        <div className="col-8 d-flex flex-column gap-2">
          <h5>Likes</h5>
          <div className="thing">item here</div>
          <div className="thing">item here</div>

          <div className="col-8 d-flex flex-column gap-2 mt-5">
            <h5>My Reviews</h5>
            <div className="thing">item here</div>
            <div className="thing">item here</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserProfile;
