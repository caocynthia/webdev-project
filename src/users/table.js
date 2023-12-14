import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link } from "react-router-dom";

function UserTable() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });

  const selectUser = async (user) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3 className="mb-4">User List</h3>

      <table className="table table-responsive align-middle">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td>
              <div className="d-flex flex-column gap-2">
                <input
                  className="form-control"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  placeholder="Username"
                />
              </div>
            </td>
            <td>
              <input
                className="form-control"
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
                placeholder="First Name"
              />
            </td>
            <td>
              <input
                className="form-control"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                placeholder="Last Name"
              />
            </td>
            <td>
              <select
                className="form-select"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="USER">User</option>
                <option value="MODERATOR">Moderator</option>
              </select>
            </td>
            <td>
              <button onClick={updateUser} className="btn btn-primary">
                Update
              </button>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <Link to={`/Profile/${user._id}`}>{user.username}</Link>
              </td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              <td>
                <div className="d-flex w-100 justify-content-center gap-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => selectUser(user)}
                  >
                    <i className="bi bi-pencil fs-6"></i>
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user)}
                  >
                    <i className="bi bi-trash fs-6"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
