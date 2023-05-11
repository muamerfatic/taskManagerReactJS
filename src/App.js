import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "../src/pages/Root";
import ErrorPage from "./pages/ErrorPage";
import DashboardPage from "./pages/DashboardPage";
import MyTasksPage from "./pages/MyTasksPage";
import ProfilePage from "./pages/ProfilePage";
import TasksPage from "./pages/TasksPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    errorElement: <ErrorPage />, // new
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    id: "dashboard",
    errorElement: <ErrorPage />,
  },
  {
    path: "/mytasks",
    element: <MyTasksPage />,
    id: "mytasks",
    errorElement: <ErrorPage />,
  },
  {
    path: "/tasks",
    element: <TasksPage />,
    id: "tasks",
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    id: "profile",
    errorElement: <ErrorPage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
    id: "unauthorized",
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
