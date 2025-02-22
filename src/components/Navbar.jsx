import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useEffect } from "react";

import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut, theme, toggleTheme } = useAuth();

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const links = (
    <>
      <li>
        <NavLink to="/" className="font-semibold text-lg">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/addTask" className="font-semibold text-lg">
          Dashboard
        </NavLink>
      </li>
    </>
  );

  const navOptions =
    user && user?.email ? (
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Photo"
              src={user?.photoURL}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li className="text-center mb-2">{user?.displayName}</li>
          <li className="mb-2">
            <button onClick={toggleTheme} className="btn btn-primary btn-sm">
              {theme === "light" ? "light" : "dark"}
            </button>
          </li>
          <li>
            <button onClick={logOut} className="btn btn-warning btn-sm">
              Logout
            </button>
          </li>
        </ul>
      </div>
    ) : (
      <div className="flex flex-col md:flex-row gap-1">
        <Link to="/signin" className="btn btn-xs md:btn-md btn-accent">
          Sign In
        </Link>
        <Link to="/signup" className="btn btn-xs md:btn-md  btn-secondary">
          Sign Up
        </Link>
      </div>
    );

  return (
    <header className="w-full fixed top-0 z-50 bg-base-100 border-b">
      <div className="navbar py-0 w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="mr-1 lg:hidden">
              <FaBars />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-accent rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"}>
            <span className="font-bold text-2xl">Todoist</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex gap-2">{links}</ul>
        </div>
        <div className="navbar-end space-x-2">{navOptions}</div>
      </div>
    </header>
  );
};

export default Navbar;
