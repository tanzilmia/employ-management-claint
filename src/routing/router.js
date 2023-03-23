import { createBrowserRouter } from "react-router-dom";
import AllUser from "../Admin/allUserInfo/AllUser";
import EdetePost from "../Admin/edetePost/EdetePost";
import SingleuserInfo from "../Admin/SingleuserInfo";
import Home from "../commonPage/Home";
import Login from "../commonPage/Login";
import Register from "../commonPage/Register";
import AddedCast from "../Employ/cast/AddedCast";
import Profile from "../Employ/profile/Profile";
import MainLayout from "../layout/MainLayout";
import AdminRouting from "./Adminrouting"
import Privetrouting from "./PrivetRouting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/addcast",
        element: (
          <Privetrouting>
            {" "}
            <AddedCast />{" "}
          </Privetrouting>
        ),
      },
      {
        path: "/profile",
        element: (
          <Privetrouting>
            {" "}
            <Profile />{" "}
          </Privetrouting>
        ),
      },
      {
        path: "/adminpannel",
        element: (
          <AdminRouting>
            {" "}
            <AllUser />{" "}
          </AdminRouting>
        ),
      },
      {
        path: "/adminpannel/users/:id",
        element: (
          <AdminRouting>
            {" "}
            <SingleuserInfo />{" "}
          </AdminRouting>
        ),
        loader : ({params})=> fetch(`https://employ-server.vercel.app/admin/user-info/${params.id}`)
      },

      {
        path: "/adminpannel/edete-post/:id",
        element: (
          <AdminRouting>
            {" "}
            <EdetePost />{" "}
          </AdminRouting>
        ),
        loader : ({params})=> fetch(`https://employ-server.vercel.app/admin/edete-post/${params.id}`)
      },
    ],
  },
]);
export default router;
