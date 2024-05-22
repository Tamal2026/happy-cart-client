import { useContext } from "react";
import { FaGoogle } from "react-icons/fa6";
import "tailwindcss/tailwind.css";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate()

  const axiosPublic = useAxiosPublic();
  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        email: result.user.email,
        name: result.user.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate('/')
      });
    });
  };
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-150"
      >
        <FaGoogle className="text-xl mr-2" />
        Sign in with Google
      </button>
    </div>
  );
};

export default SocialLogin;
