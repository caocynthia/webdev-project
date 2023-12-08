import { Link } from "react-router-dom";
function ProfileEdit() {
  return (
    <>
      <div className="page-padding">
        <i className="profile-pic bi bi-person-circle"></i>
        <div className="d-flex gap-2 align-items-center my-3">
          <label>Name</label>
          <input className="form-control w-25" value="john doe" />
        </div>
        <div className="d-flex gap-2 align-items-center my-3">
        <label>Email</label>
        <input className="form-control" type="email" value="john.doe@gmail.com"/>
        </div>
        <div className="d-flex gap-2 align-items-center my-3">
        <label>Password</label>
        <input className="form-control" type="password" value="doeremi"/>
        </div>
        <Link to="../Profile" className="btn btn-primary">Save Changes</Link>
      </div>
    </>
  );
}
export default ProfileEdit;
