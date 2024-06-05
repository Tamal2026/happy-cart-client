import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { FaBars } from "react-icons/fa6";

const Dashboard: React.FC = () => {
  const [isAdmin] = useAdmin();
  const [showOptions, setShowOptions] = useState(false);
  const location = useLocation();

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "bg-blue-700 text-white rounded-lg " : "";
  };

  return (
    <div className="flex min-h-screen  bg-gray-100">
      <aside className="w-64 bg-blue-900 mb-3 text-white md:block hidden">
        <div className="p-6">
          <h2 className="text-3xl font-bold">Dashboard</h2>
        </div>
        {isAdmin ? (
          <ul>
            <li>
              <NavLink
                to="/dashboard/adminOverview"
                className={`block px-6 py-2  ${isActive("/dashboard/adminOverview")}`}
              >
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manageProducts"
                className={`block px-6 py-2  ${isActive("/dashboard/manageProducts")}`}
              >
                Manage Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/addProduct"
                className={`block px-6 py-2  ${isActive("/dashboard/addProduct")}`}
              >
                Add Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/allusers"
                className={`block px-6 py-2  ${isActive("/dashboard/allusers")}`}
              >
                All Users
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink
                to="/dashboard/UserOverview"
                className={`block px-6 py-2  ${isActive("/dashboard/UserOverview")}`}
              >
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/paymentHistory"
                className={`block px-6 py-2   ${isActive("/dashboard/paymentHistory")}`}
              >
                Payment History
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/wishlist"
                className={`block px-6 py-2  ${isActive("/dashboard/wishlist")}`}
              >
                Wishlist
              </NavLink>
            </li>
          </ul>
        )}
        <hr className="my-5" />
        <div className="mt-4">
          <Link
            to="/"
            className="block px-6 py-2 "
          >
            Back to Home
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <div className="md:hidden">
          <button
            onClick={toggleOptions}
            className="block px-4 mb-3 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg"
          >
          <FaBars />
          </button>
          {showOptions && (
            <div className="mt-2">
              <ul>
                {isAdmin ? (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard/adminOverview"
                        className={`block px-6 py-2  ${isActive("/dashboard/adminOverview")}`}
                      >
                        Overview
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/manageProducts"
                        className={`block px-6 py-2  ${isActive("/dashboard/manageProducts")}`}
                      >
                        Manage Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/addProduct"
                        className={`block px-6 py-2  ${isActive("/dashboard/addProduct")}`}
                      >
                        Add Product
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/allusers"
                        className={`block px-6 py-2  ${isActive("/dashboard/allusers")}`}
                      >
                        All Users
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard/UserOverview"
                        className={`block px-6 py-2  ${isActive("/dashboard/UserOverview")}`}
                      >
                        Overview
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/paymentHistory"
                        className={`block px-6 py-2  ${isActive("/dashboard/paymentHistory")}`}
                      >
                        Payment History
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/wishlist"
                        className={`block px-6 py-2  ${isActive("/dashboard/wishlist")}`}
                      >
                        Wishlist
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
              <div className="mt-4">
                <Link
                  to="/"
                  className="block px-6 py-2 "
                >
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold mb-7 text-white bg-cyan-500 py-3 md:w-1/2 lg:w-1/3 text-center rounded-lg mx-auto">Welcome to Dashboard</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
