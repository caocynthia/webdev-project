import * as client from "../../users/client";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";

function ProfileEdit() {
  const [user, setUser] = useSessionStorage("currentUser");

  const navigate = useNavigate();

  const save = async () => {
    await client.updateUser(user);
    navigate("/Profile");
  };

  return (
    <div className="col col-lg-6">
      <h1>Profile Edit</h1>
      {user && (
        <div className="d-flex flex-column mt-4 gap-4">
          <div className="d-flex flex-column mt-4 gap-4">
            <div className="d-flex flex-column flex-md-row gap-2 mb-4">
              <div className="col-md-6">
                <label className="">
                  <h5>Username</h5>
                </label>
                <input
                  className="form-control"
                  placeholder="Username"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="">
                  <h5>Password</h5>
                </label>
                <input
                  className="form-control"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="d-flex flex-column flex-md-row gap-2 mb-4">
              <div className="col-md-6">
                <label className="">
                  <h5>First Name</h5>
                </label>
                <input
                  className="form-control"
                  placeholder="First Name"
                  value={user.firstName}
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="">
                  <h5>Last Name</h5>
                </label>
                <input
                  className="form-control"
                  placeholder="Last Name"
                  value={user.lastName}
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="">
                <h5>Email</h5>
              </label>
              <input
                className="form-control"
                placeholder="Email Address"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={save}>
              Save
            </button>
            <button
              className="btn btn-danger"
              onClick={() => navigate("/Profile")}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProfileEdit;

// import { Link } from "react-router-dom";
// import * as client from "../../users/client";

// function ProfileEdit() {
//   const save = async () => {
//     try {
//       await client.updateUser(account);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       <div className="page-padding">
//         <i className="profile-pic bi bi-person-circle"></i>
//         <div className="d-flex gap-2 align-items-center my-3">
//           <label>Name</label>
//           <input className="form-control w-25" value="john doe" />
//         </div>
//         <div className="d-flex gap-2 align-items-center my-3">
//           <label>Email</label>
//           <input
//             className="form-control"
//             type="email"
//             value="john.doe@gmail.com"
//           />
//         </div>
//         <div className="d-flex gap-2 align-items-center my-3">
//           <label>Password</label>
//           <input className="form-control" type="password" value="doeremi" />
//         </div>
//         <Link
//           to="../Profile"
//           className="btn btn-primary"
//           onClick={() => save()}
//         >
//           Save Changes
//         </Link>
//       </div>
//     </>
//   );
// }
// export default ProfileEdit;
