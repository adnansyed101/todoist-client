import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import SignIn from "../pages/Signin";
import SignUp from "../pages/SignUp";
import HomePage from "../pages/HomePage";
import Dashboard from "../layout/Dashboard";
import AddTask from "../pages/AddTask";
import MyTasks from "../pages/MyTasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "addTask",
        element: <AddTask />,
      },
      {
        path: "myTask",
        element: <MyTasks />,
      },
    ],
  },
]);

export default router;
