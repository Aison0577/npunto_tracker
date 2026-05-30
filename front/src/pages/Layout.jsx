import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  DashboardSquare01Icon,
  PinIcon,
  Calendar01Icon,
  ChartBarLineIcon,
  UserGroupIcon,
  Logout01Icon,
  Calendar02Icon,
} from "hugeicons-react";
import useAuth from "../hooks/AuthStore";
import toast from "react-hot-toast";
import { useAccountLogout } from "../services/api/tanstack";
import { CircularProgress } from "@mui/material";
import Drawer from "../component/SideDrawer";

const navItems = [
  { to: "/tracker/dashboard", label: "Dashboard", Icon: DashboardSquare01Icon },
  { to: "/tracker/activity/new", label: "New Activity", Icon: PinIcon },
  { to: "/tracker/daily", label: "Daily View", Icon: Calendar01Icon },
  // { to: "/tracker/activity/all", label: "All Activities", Icon: Calendar02Icon },
  // { to: "/tracker/reports", label: "Log Reports", Icon: ChartBarLineIcon },
  // { to: "/tracker/team", label: "Team", Icon: UserGroupIcon },
];

const adminNavItems = [
  { to: "/tracker/dashboard", label: "Dashboard", Icon: DashboardSquare01Icon },
  { to: "/tracker/activity/new", label: "New Activity", Icon: PinIcon },
  { to: "/tracker/daily", label: "Daily View", Icon: Calendar01Icon },
  {
    to: "/tracker/activity/all",
    label: "All Activities",
    Icon: Calendar02Icon,
  },
  { to: "/tracker/reports", label: "Log Reports", Icon: ChartBarLineIcon },
  { to: "/tracker/team", label: "Team", Icon: UserGroupIcon },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { mutate, isPending } = useAccountLogout();

  const handleLogout = () => {
    mutate(null, {
      onSettled: (data) => {
        console.log(data);
        toast.success(data);
        logout();
        navigate("/");
      },
    });
  };

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const currentUserLinks = user.role === "admin" ? adminNavItems : navItems;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-white border-r border-gray-100 lg:flex flex-col hidden">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-gray-100">
          <p className="font-jakarta font-extrabold text-lg text-gray-800 tracking-tight">
            Npontu
          </p>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            Activity Tracker
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {currentUserLinks.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {user?.name}
              </p>
              <p className="text-[11px] text-gray-400 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-1 w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            disabled={isPending}
          >
            {isPending ? (
              <CircularProgress size={20} className="mx-auto" />
            ) : (
              <>
                <Logout01Icon size={14} />
                Sign out
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Page */}
      <main className="flex-1 overflow-auto h-screen">
        <Outlet />
      </main>
    </div>
  );
}
