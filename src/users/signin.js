import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/");
  };

  return (
    <>
      <div className="card w-50 d-flex flex-column col-4 gap-2">
        <h5>Sign in with an existing account!</h5>
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
