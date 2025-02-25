import { Link, Outlet } from "react-router-dom";
import DashNav from "../components/DashNav";

const Dashboard = () => {
  return (
    <>
      <DashNav />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-2">
          {/* Page content here */}
          <Outlet />
          
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-60 p-4 space-y-2">
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
