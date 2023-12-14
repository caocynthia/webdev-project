import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";

function AdminProfile() {
  const [user, setUser] = useSessionStorage("currentUser");
  const navigate = useNavigate();

  return (
    <>
      {!user.firstName && !user.lastName && !user.email && (
        <div className="mb-2">Finish setting up your profile!</div>
      )}
      <h5>
        {user.firstName} {user.lastName}
      </h5>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <div className="d-flex flex-column w-100 gap-4 mb-4">
        <button
          onClick={() => navigate("/Profile/ProfileEdit")}
          className="btn btn-primary w-100"
        >
          Edit Profile
        </button>
      </div>
    </>
  );
}
export default AdminProfile;
