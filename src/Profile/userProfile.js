import { Link } from "react-router-dom";
function UserProfile() {
  return (
    <>
      <i className="profile-pic bi bi-person-circle"></i>
      <div className="row">
        <div className="col-3 d-flex flex-column gap-2">
          <h5>Name</h5>
          <p>bio text here lalala</p>
          <Link to="ProfileEdit" className="btn btn-primary w-50">
            Edit Profile
          </Link>
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
