import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";

function Signin() {
  const [error, setError] = useState("");

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [user, setUser] = useSessionStorage("currentUser", null);

  const signin = async () => {
    try {
      let currentUser = await client.signin(credentials);
      setUser(currentUser);
      console.log(user);
      navigate("/Profile/" + currentUser._id);
    } catch (err) {
      setError("Wrong username or password, try again!");
      console.log(err);
    }
  };

  return (
    <>
      <div className="card w-50 d-flex flex-column col-4 gap-2">
        <h5>Sign in with an existing account!</h5>
        {error && <div>{error}</div>}
        <div>
          <input
            className="form-control"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
        </div>
        <div>
          <input
            className="form-control"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        <div>
          <button className="btn btn-primary" onClick={signin}>
            Sign in
          </button>
        </div>
      </div>
    </>
  );
}
export default Signin;
