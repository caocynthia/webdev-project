function ProfileEdit() {
  return (
    <>
      <div className="page-padding">
        <i className="profile-pic bi bi-person-circle"></i>
        <div className="d-flex gap-2 align-items-center">
          <label>Name</label>
          <input value="john doe" />
        </div>
        <input type="email" value="john.doe@gmail.com"/>
      </div>
    </>
  );
}
export default ProfileEdit;
