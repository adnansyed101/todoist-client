import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const NavbarOptions = () => {
  const { user, logOut, theme, toggleTheme } = useAuth();

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      {user && user?.email ? (
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
      )}
    </>
  );
};

export default NavbarOptions;
