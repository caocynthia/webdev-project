import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { useSessionStorage } from "usehooks-ts";

function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "USER",
    likedMovies: [],
  });

  const navigate = useNavigate();
  const [user, setUser] = useSessionStorage("currentUser");

  const signup = async () => {
    try {
      let currentUser = await client.signup(credentials);
      setUser(currentUser);
      navigate("/Profile/" + currentUser._id);
    } catch (err) {
      setError("This username already exists, try again!");
    }
  };

  return (
    <div className="card login d-flex flex-column col-4 gap-2">
      <h5>Create an account to post movie reviews!</h5>
      {error && <div>{error}</div>}
      <input
        className="form-control"
        placeholder="Create a username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({
            ...credentials,
            username: e.target.value,
          })
        }
      />
      <input
        className="form-control"
        placeholder="Create a password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({
            ...credentials,
            password: e.target.value,
          })
        }
      />
      <div>
        <button className="btn btn-primary" onClick={signup}>
          Create Account
        </button>
      </div>
    </div>
  );
}
export default Signup;
