import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../contextApi/Authcontext";

const Navbar = () => {
  const neviget = useNavigate();
  const { user, logout } = useContext(myContext);

  const handleLogout = () => {
    logout();
    neviget("/");
  };

  // get all categorys

  return (
    <div className="navbar bg-black">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3  shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-white font-semibold tracking-tight"
              >
                Home
              </Link>
            </li>
            {user?.role === "admin" && (
              <li className="block mt-4 md:inline-block md:mt-0 lg:inline-block lg:mt-0 ">
                <Link
                  to="/adminpannel"
                  className="text-gray-300 hover:text-white font-semibold tracking-tight"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
            {user?.email ? (
              <>
                <li className="block mt-4 md:inline-block md:mt-0 lg:inline-block lg:mt-0 ">
                  <Link
                    to="/profile"
                    className="text-gray-300 hover:text-white font-semibold "
                  >
                    My Profile
                  </Link>
                </li>

                <li className="block mt-4 md:inline-block md:mt-0 lg:inline-block lg:mt-0 ">
                  <Link
                    to="/addcast"
                    className="text-gray-300 hover:text-white font-semibold tracking-tight"
                  >
                    Add Cast
                  </Link>
                </li>
                <button
                  className="btn btn-active btn-primary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <li className="block mt-4 md:inline-block md:mt-0 lg:inline-block lg:mt-0 ">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white font-semibold tracking-tight"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl text-gray-300 hover:text-white font-semibold tracking-tight">
        Employ Management
        </a>
      </div>
      <div className="navbar-end px-2 hidden lg:flex">
        <ul className="menu menu-horizontal ">
          <li>
            <Link
              to="/"
              className="text-gray-400 hover:text-white font-semibold tracking-tight"
            >
              Home
            </Link>
          </li>
          {user?.role === "admin" && (
            <li className="block mt-4 md:inline-block md:mt-0 lg:inline-block lg:mt-0">
              <Link
                to="/adminpannel"
                className="text-gray-300 hover:text-white font-semibold tracking-tight"
              >
                Admin Dashboard
              </Link>
            </li>
          )}
          {user?.email ? (
            <>
              <li className="block mt-4 md:inline-block md:mt-0 lg:inline-block lg:mt-0 ">
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white font-semibold tracking-tight"
                >
                  My Profile
                </Link>
              </li>

              <li className="block mt-4 md:inline-block md:mt-0 lg:inline-block lg:mt-0 ">
                <Link
                  to="/addcast"
                  className="text-gray-300 hover:text-white font-semibold tracking-tight"
                >
                  Add Cast
                </Link>
              </li>
              <button
                className="btn btn-active btn-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <li className="block mt-4 md:inline-block md:mt-0 lg:inline-block lg:mt-0">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white font-semibold tracking-tight"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
