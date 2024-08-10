import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
// import About from "../pages/About";
// import Landingpage from "../pages/Landingpage";
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Forgot from "../pages/Forgot";
import Reset from "../pages/Reset";
import Detail from "../pages/Detail";
import Profile from "../pages/Profile";
import MyProfile from "../pages/MyProfile";
import Follows from "../pages/Follows";
import Replies from "../pages/Replies";
import Search from "../pages/Search";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "follows",
        element: <Follows />,
      },
      {
        path: "Replies",
        element: <Replies />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "detail/:id",
        element: <Detail />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot",
        element: <Forgot />,
      },
      {
        path: "reset",
        element: <Reset />,
      },
    ],
  },
];

export default routes;
