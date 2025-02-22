import { FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import NavbarOptions from "./NavbarOptions";

const DashNav = () => {
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
    <header className="bg-base-100 border-b">
      <div className="navbar py-0 w-11/12 mx-auto">
        <div className="navbar-start">
          <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
            <FaBars />
          </label>
          <Link to={"/"}>
            <span className="font-bold text-2xl">Go Home</span>
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

export default DashNav;
