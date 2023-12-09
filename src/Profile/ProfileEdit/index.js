import * as client from "../../users/client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProfileEdit() {
  const { id } = useParams();
  const [account, setAccount] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setAccount(user);
      };
      findUserById(id);
    } else {
      const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
      };
      fetchAccount();
    }
  }, [id]);

  const save = async () => {
    await client.updateUser(account);
    navigate("/Profile/" + id);
  };

  return (
    <div className="col col-lg-6">
      <h1>Profile Edit</h1>
      {account && (
        <div className="d-flex flex-column mt-4 gap-4">
          <div className="d-flex flex-column mt-4 gap-4">
            <div className="d-flex flex-column flex-md-row gap-2 mb-4">
              <div className="col-md-6">
                <label className="">
                  <h5>Username</h5>
                </label>
                <input
                  className="form-control"
                  value={account.username}
                  onChange={(e) =>
                    setAccount({ ...account, username: e.target.value })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="">
                  <h5>Password</h5>
                </label>
                <input
                  className="form-control"
                  value={account.password}
                  onChange={(e) =>
                    setAccount({ ...account, password: e.target.value })
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
                  value={account.firstName}
                  onChange={(e) =>
                    setAccount({ ...account, firstName: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="">
                  <h5>Last Name</h5>
                </label>
                <input
                  className="form-control"
                  value={account.lastName}
                  onChange={(e) =>
                    setAccount({ ...account, lastName: e.target.value })
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
                value={account.email}
                onChange={(e) =>
                  setAccount({ ...account, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={save}>
              Save
            </button>
            <button
              className="btn btn-danger"
              onClick={() => navigate("/Profile/" + id)}
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
