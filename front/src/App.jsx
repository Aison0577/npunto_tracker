import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Landing from "./Landing";

// Admin
import AdminLayout from "./pages/Layout";
import AdminDashboard from "./pages/Dashboard";
import NewActivity from "./pages/NewActivity";
import AdminDailyView from "./pages/DailyView";
import ActivityDetails from "./pages/ActivityDetails";
import TeamMembers from "./pages/TeamMembers";
import Report from "./pages/Report";
import AllActivities from "./pages/AllActivities";

// Guards
// import { AdminRoute, StaffRoute } from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/tracker",
      element: 
      // <AdminRoute>
        <AdminLayout />
        // </AdminRoute>
        ,
      children: [
        { index: true, element: <Navigate to="dashboard" replace /> },
        { path: "dashboard",    element: <AdminDashboard /> },
        { path: "activity/new", element: <NewActivity /> },
        { path: "activity/:id/details", element: <ActivityDetails /> },
        { path: "daily",        element: <AdminDailyView /> },
        { path: "activity/all",element: <AllActivities /> },
        { path: "reports",      element: <Report /> },
        { path: "team",         element: <TeamMembers /> },
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

