import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import SignIn from "../pages/Signin";
import SignUp from "../pages/SignUp";
import HomePage from "../pages/HomePage";

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
]);

export default router;
