import React, { useState, Link } from "react";
import * as client from "./client"
function UserList() {
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users)
    };
    useState(() => {
        fetchUsers();
    }, []);
    return(
        <div>
            <h1>Users</h1>
            <ul>
               {users.map(user => {
                <li key={user._id}>
                    <Link to={`/users/${user._id}`}>{user.username}</Link>
                </li>
               })} 
            </ul>
        </div>
    );
}
export default UserList;