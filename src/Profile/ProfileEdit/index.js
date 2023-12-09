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
      <h1>Account</h1>
      {account && (
        <div>
          <input
            value={account.password}
            onChange={(e) =>
              setAccount({ ...account, password: e.target.value })
            }
          />
          <br />
          <input
            value={account.firstName}
            onChange={(e) =>
              setAccount({ ...account, firstName: e.target.value })
            }
          />
          <br />
          <input
            value={account.lastName}
            onChange={(e) =>
              setAccount({ ...account, lastName: e.target.value })
            }
          />
          <br />
          <input
            value={account.dob}
            onChange={(e) => setAccount({ ...account, dob: e.target.value })}
          />
          <br />
          <input
            value={account.email}
            onChange={(e) => setAccount({ ...account, email: e.target.value })}
          />
          <br />
          <select
            onChange={(e) => setAccount({ ...account, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="MODERATOR">Admin</option>
          </select>
          <br />
          <button className="btn btn-primary w-100" onClick={save}>
            Save
          </button>
          <button className="btn btn-danger w-100" onClick={signout}>
            Signout
          </button>
          <Link to="/project/admin/users" className="btn btn-warning w-100">
            Users
          </Link>
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
