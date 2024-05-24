import React from "react";

import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const Dashboard: React.FC = () => {
  const [isAdmin] = useAdmin()
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-900 text-white">
        <div className="p-6">
          <h2 className="text-3xl font-bold">Dashboard</h2>
        </div>
        {isAdmin ? (
          <ul className="mt-6">
            <li className="px-6 py-2 hover:bg-blue-700">
              <Link to="/dashboard/overview">Overview</Link>
            </li>
            <NavLink to="/dashboard/addProduct">
              <li className="px-6 py-2 hover:bg-blue-700">
                <h1>Add Product</h1>
              </li>
            </NavLink>
            <NavLink to="/dashboard/allusers">
              <li className="px-6 py-2 hover:bg-blue-700">
                <h1>All Users</h1>
              </li>
            </NavLink>

           
            <li className="px-6 py-2 hover:bg-blue-700">
              <Link to="/dashboard/notifications">Notifications</Link>
            </li>
            <li className="px-6 py-2 hover:bg-blue-700">
              <Link to="/checkout">Messages</Link>
            </li>
            <li className="px-6 py-2 hover:bg-blue-700">
              <Link to="/dashboard/support">Support</Link>
            </li>
            <hr className="my-4 border-gray-600" />
          </ul>
        ) : (
          <ul className="mt-6">
            <li className="px-6 py-2 hover:bg-blue-700">
              <Link to="/dashboard/overview">Overview</Link>
            </li>
            <li className="px-6 py-2 hover:bg-blue-700">
              <Link to="/dashboard/allusers">Alddl Users</Link>
            </li>
            <li className="px-6 py-2 hover:bg-blue-700">
              <Link to="/dashboard/settings">Settings</Link>
            </li>
            <li className="px-6 py-2 hover:bg-blue-700">
              <Link to="/dashboard/notifications">Notifications</Link>
            </li>
            <li className="px-6 py-2 hover:bg-blue-700">
              <Link to="/checkout">Messages</Link>
            </li>
            <li className="px-6 py-2 hover:bg-blue-700">
              <Link to="/dashboard/support">Support</Link>
            </li>
            <hr className="my-4 border-gray-600" />
          </ul>
        )}


        <ul>
          <Link to="/">
            <li className="px-6 py-2 hover:bg-blue-700">
              <h1>Back to Home</h1>
            </li>
          </Link>

          <li className="px-6 py-2 hover:bg-blue-700">
            <Link to="/dashboard/analytics">Analytics</Link>
          </li>
          <li className="px-6 py-2 hover:bg-blue-700">
            <Link to="/dashboard/integrations">Integrations</Link>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
        <p className="mt-4">
          Select an option from the sidebar to get started.
        </p>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
