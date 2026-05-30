import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Landing from "./Landing";

// system pages
import Dashboard from "./pages/Dashboard";
import NewActivity from "./pages/NewActivity";
import ActivityDetails from "./pages/ActivityDetails";
import TeamMembers from "./pages/TeamMembers";
import Report from "./pages/Report";
import AllActivities from "./pages/AllActivities";
import Layout from "./pages/Layout";
import DailyView from "./pages/DailyView";

// Guard
import ProtectedRoutes from "./component/ProtectedRoutes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/tracker",
      element: (
        <ProtectedRoutes
          role="staff"
          redirectPath="/"
          optionalRoles={["admin"]}
        >
          <Layout />
        </ProtectedRoutes>
      ),
      children: [
        { index: true, element: <Navigate to="dashboard" replace /> },
        { path: "dashboard", element: <Dashboard /> },
        {
          path: "activity/new",
          element: (
            <ProtectedRoutes role={"admin"} optionalRoles={['staff']} redirectPath={'/'}>
              <NewActivity />
            </ProtectedRoutes>
          ),
        },
        { path: "activity/:id/details", element: <ActivityDetails /> },
        { path: "daily", element: <DailyView /> },
        {
          path: "activity/all",
          element: (
            <ProtectedRoutes role={"admin"} redirectPath={'/'}>
              <AllActivities />
            </ProtectedRoutes>
          ),
        },
        {
          path: "reports",
          element: (
            <ProtectedRoutes role={"admin"} redirectPath={'/'}>
              <Report />
            </ProtectedRoutes>
          ),
        },
        {
          path: "team",
          element: (
            <ProtectedRoutes role={"admin"} redirectPath={'/'}>
              <TeamMembers />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
