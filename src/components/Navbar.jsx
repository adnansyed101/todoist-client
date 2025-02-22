import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import NavbarOptions from "./NavbarOptions";

const Navbar = () => {
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
        <div className="navbar-end space-x-2">
          <NavbarOptions />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
