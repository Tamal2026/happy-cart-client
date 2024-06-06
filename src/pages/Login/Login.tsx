import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.pathname || "/";

  const handleLogin = (e, email, password) => {
    e.preventDefault();
    signIn(email, password).then((result) => {
      const user = result.user;
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: 'url("https://i.ibb.co/YRwbGVw/signup-bg.png")' }}>
      <div className="max-w-md w-full bg-white shadow-md rounded-md mx-10 ml-10 p-8">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl text-blue-500 font-bold s mb-4">Login now!</h1>
        
        </div>
        <form  onSubmit={handleLogin}>
          <div className="mb-4 ">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="email"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6 text-center">
            <input type="submit" className="btn btn-primary" value="Login" />
          </div>
        </form>
        <div className="flex justify-center items-center">
          <button className="btn bg-green-500 text-white mr-4" onClick={(e) => handleLogin(e, "user@gmail.com", "User123@")}>User Demo</button>
          <button className="btn btn-secondary" onClick={(e) => handleLogin(e, "tamalgg@gmail.com", "12345T@t")}>Admin Demo</button>
        </div>
        <div className="mt-4 text-center">
          <h1>
            New here? Go to{" "}
            <Link className="text-green-500" to="/signUp">
              Sign-up
            </Link>
          </h1>
          <div className="mt-2 mb-5">
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
