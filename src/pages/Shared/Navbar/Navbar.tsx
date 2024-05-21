
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { BiRightArrow } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import useCart from "../../../hooks/useCart";

import { FaLongArrowAltRight } from "react-icons/fa";

const Navbar = () => {
  const [cart] = useCart();
  const { user, logOut } = useContext(AuthContext);


  const handleLogOut = () => {
    logOut(user).then(() => {});
  };



  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
                <ul className="p-2">
                  <li>
                    <a>Apple</a>
                  </li>
                  <li>
                    <a>Orange</a>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li className="text-black">
                <h1>
                  Cart<FaCartShopping></FaCartShopping>
                </h1>
              </li>
              <li>
                {user ? (
                  <>
                    Login <BiRightArrow></BiRightArrow>
                    <button
                      onClick={handleLogOut}
                      className="btn btn-outline btn-warning"
                    >
                      Logout
                    </button>{" "}
                  </>
                ) : (
                  <>
                    <Link to="/login">Login</Link>{" "}
                  </>
                )}
              </li>
            </ul>
          </div>
          <img
            src="../../../../public/assets/logomain.png"
            className="h-[150px] w-[190px]"
            alt=""
          />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <details>
                <summary>Shop</summary>
                <ul className="p-2">
                  <li>
                    <a>Apple</a>
                  </li>
                  <li>
                    <a>Orange</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <Link to="/cart"><li>
              <h1 className="bg-amber-500 hover:bg-black text-white">
                <FaCartShopping className="text-sm "></FaCartShopping>+
                {cart.length}
              </h1>
            </li></Link>
            <li></li>
            <li>
              {user ? (
                <>
                  <details>
                    <summary>Dashboard</summary>
                    <ul className="p-2">
                      <li>
                        <Link to="/dashboard"><button>Dashboard</button></Link> 
                      </li>
                      <li>
                        <button onClick={handleLogOut}>
                          Logout<FaLongArrowAltRight></FaLongArrowAltRight>
                        </button>
                      </li>
                    </ul>
                  </details>
                </>
              ) : (
                <>
                  <Link to="/login">
                    Login <BiRightArrow></BiRightArrow>
                  </Link>{" "}
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
     
    </div>
  );
};

export default Navbar;
