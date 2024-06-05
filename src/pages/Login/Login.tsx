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
    <div className="hero min-h-screen bg-cover" style={{ backgroundImage: 'url("https://i.ibb.co/d53K75V/loginbg.jpg")' }}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-white">Login now!</h1>
          <p className="py-6 text-white">
            Login to SuperShop for exclusive deals, easy order management, and seamless shopping. Forgot your password? No problem! Join us now for secure access and personalized recommendations.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
          
            </div>
            <div className="form-control mt-6">
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
          </form>
          <div className="flex justify-center items-center mx-auto lg:justify-start mt-4">
            <button className="btn bg-green-500 text-white mr-4" onClick={(e) => handleLogin(e, "user@gmail.com", "User123@")}>User Demo</button>
            <button className="btn btn-secondary" onClick={(e) => handleLogin(e, "MrAdmin@gmail.gg", "Admin123@")}>Admin Demo</button>
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
    </div>
  );
};

export default Login;
