import Signin from "../users/signin";
import Signup from "../users/signup";

function LoginPage() {
  return (
    <>
      <div className="d-flex flex-column align-items-center gap-4">
        <Signin />
        <h5>OR</h5>
        <Signup />
      </div>
    </>
  );
}
export default LoginPage;
