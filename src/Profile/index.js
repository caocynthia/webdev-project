import NavBar from "../Navbar";

function Profile() {
  return (
    <>
      <NavBar />
      <div className="page-padding">
        <i className="profile-pic bi bi-person-circle"></i>
        <div className="row">
          <div className="col-2 d-flex flex-column gap-2">
            <h5>Name</h5>
            <p>bio text here lalala</p>
          </div>
          <div className="col-8 d-flex flex-column gap-2">
            <h5>Likes</h5>
            <div className="thing">item here</div>
            <div className="thing">item here</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
