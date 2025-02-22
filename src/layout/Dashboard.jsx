import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link to={"/dashboard/addTask"}>Add Task</Link>
            </li>
            <li>
              <Link to={"/dashboard/myTask"}>My Task</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
