import * as client from "../../users/client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ProfileEdit() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setAccount(user);
  };

  const signout = async () => {
    await client.signout();
    navigate("/");
  };

  const navigate = useNavigate();
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };

  const save = async () => {
    await client.updateUser(account);
  };

  useEffect(() => {
    console.log(id);
    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
    }
  }, []);

  return (
    <div className="w-50">
      <h1>Profile Edit</h1>
      {account && (
        <div className="d-flex flex-column mt-4 gap-4">
          <div className="d-flex flex-column mt-4 gap-4">
            <div>
              <label className="col-4">
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
            <div>
              <label className="col-4">
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

            <div>
              <label className="col-4">
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
            <div>
              <label className="col-4">
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

            <div>
              <label className="col-4">
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
          <button className="btn btn-primary w-100" onClick={save}>
            Save
          </button>
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
