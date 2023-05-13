import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "../src/pages/Root";
import ErrorPage from "./pages/ErrorPage";
import DashboardPage from "./pages/DashboardPage";
import MyTasksPage from "./pages/MyTasksPage";
import ProfilePage from "./pages/ProfilePage";
import TasksPage from "./pages/TasksPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ProtectedPage from "./pages/ProtectedPage";
import UserDataProvider from "./store/UserDataProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedPage>
        <DashboardPage />
      </ProtectedPage>
    ),
    id: "dashboard",
    errorElement: <ErrorPage />,
  },
  {
    path: "/mytasks",
    element: (
      <ProtectedPage>
        <MyTasksPage />
      </ProtectedPage>
    ),
    id: "mytasks",
    errorElement: <ErrorPage />,
  },
  {
    path: "/tasks",
    element: (
      <ProtectedPage>
        <TasksPage />
      </ProtectedPage>
    ),
    id: "tasks",
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedPage>
        <ProfilePage />
      </ProtectedPage>
    ),
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
  return (
    <UserDataProvider>
      <RouterProvider router={router} />
    </UserDataProvider>
  );
}

export default App;
