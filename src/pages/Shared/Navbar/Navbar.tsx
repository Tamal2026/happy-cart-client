import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext,AuthContextType } from "../../../providers/AuthProvider";
import { BiRightArrow } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import useCart from "../../../hooks/useCart";

import { FaLongArrowAltRight } from "react-icons/fa";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const authContext = useContext(AuthContext) as AuthContextType;
const { user,logOut } = authContext;

const handleLogOut = () => {
  logOut().then(() => {});
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
              <NavLink to="/shop">
                <li>
                  <h1>Shop</h1>
                </li>
              </NavLink>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              {isAdmin ? (
                ""
              ) : (
                <Link to={user ? "/cart" : "/login"}>
                  <li>
                    <h1 className="bg-amber-500 hover:bg-black text-white">
                      <FaCartShopping className="text-sm "></FaCartShopping>+
                      {cart.length}
                    </h1>
                  </li>
                </Link>
              )}
              <li>
                {user ? (
                  <>
                     <BiRightArrow></BiRightArrow>
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
          <Link to="/">
            <img
              src="https://i.ibb.co/rwY4jPD/logomain.png"
              className="h-[150px] w-[190px]"
              alt=""
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <NavLink to="/shop">
              <li>
             <h1>Shop</h1>
              </li>
            </NavLink>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            {isAdmin ? (
              ""
            ) : (
              <Link to={user ? "/cart" : "/login"}>
                <li>
                  <h1 className="bg-amber-500 hover:bg-black text-white">
                    <FaCartShopping className="text-sm "></FaCartShopping>+
                    {cart.length}
                  </h1>
                </li>
              </Link>
            )}
            <li></li>
            <li>
              {user ? (
                <>
                  <details>
                    <summary>Dashbaord</summary>
                    <ul className="p-2">
                      {user && isAdmin ? (
                        <li>
                          <Link to="/dashboard/adminOverview">
                            <button>Dashboard</button>
                          </Link>
                        </li>
                      ) : (
                        <li>
                          <Link to="/dashboard/userOverview">
                            <button>Dashboard</button>
                          </Link>
                        </li>
                      )}
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
