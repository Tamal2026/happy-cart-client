import { useContext, useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

const Login = () => {
  const captchaRef = useRef(null);
  const [disable, setDiable] = useState(true);
  const {signIn} = useContext(AuthContext);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);
    signIn(email , password).then(result =>{

      const user = result.user;
      console.log(user)
    })
  };

  const handleValidateCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value)) {
      setDiable(false);
    } else {
      setDiable(true);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
          
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
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate></LoadCanvasTemplate>
              </label>
              <input
                ref={captchaRef}
                type="text"
                name="captcha"
                placeholder="Enter the captcha"
                className="input input-bordered"
              />
              <button
                onClick={handleValidateCaptcha}
                className="btn hover:bg-gray-700 hover:text-white mt-4 w-full"
              >
                Validate
              </button>
            </div>
            <div className="form-control mt-6">
              <input
                disabled={disable}
                type="submit"
                onSubmit={handleLogin}
                className="btn btn-primary"
                value="Login"
              />
            </div>
            <div>
              <h1>New here ? Go to <Link className="text-green-500" to="/signUp">Sign-up</Link></h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
