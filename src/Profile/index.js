import NavBar from "../Navbar";

function Profile() {
  return (
    <>
      <NavBar />
      <div className="page-padding">
        <i className="profile-pic bi bi-person-circle"></i>
        <div className="d-flex gap-2 align-items-center">
          <label>Name</label>
          <input value="john doe" />
        </div>
      </div>
    </>
  );
}
export default Profile;
