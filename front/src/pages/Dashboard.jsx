import React from "react";
// import Header from "../../component/Header";
// import DashboardAnalysisBar from "../../component/DashboardAnalysisBar";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Header from "../component/Header";
import DashboardAnalysisBar from "../component/DashboardAnalysisBar";
import useAuth from "../hooks/AuthStore";
import { useDailyView } from "../services/api/tanstack";
import { PinIcon } from "hugeicons-react";

const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const today = format(new Date(), "yyyy-MM-dd");
  const { data: activities = [], isLoading } = useDailyView(today);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title={"Dashboard"}
        options={
          <Link to="/tracker/activity/new">
            <button className="bg-primary text-white text-xs px-6 py-3 rounded-2xl font-medium flex items-center gap-1">
              <PinIcon /> New Activity
            </button>
          </Link>
        }
      />
      <div className="flex flex-row overflow-hidden h-full">
        <DashboardAnalysisBar />
        <div className="flex-1 overflow-auto ">
          <main className="pageWidth py-6">
            {/* Greeting */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-500 text-sm">
                  {format(new Date(), "EEEE, MMMM d")}
                </p>
                <p className="font-jakarta font-bold text-xl text-gray-800 mt-0.5">
                  {greeting()}, {user?.name?.split(" ")[0]} 👋
                </p>
              </div>
            </div>

            {/* Today's activities */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <p className="font-semibold text-gray-800 text-sm">
                  Today's Activities
                </p>
                <button
                  onClick={() => navigate("/tracker/daily")}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  View all →
                </button>
              </div>

              {isLoading ? (
                <div className="p-8 text-center text-gray-400 text-sm">
                  Loading...
                </div>
              ) : activities.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm">
                  No activities scheduled for today.{" "}
                  <Link
                    to="/tracker/activity/new"
                    className="text-primary font-medium"
                  >
                    Create one?
                  </Link>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {[
                        "Activity",
                        "Scheduled",
                        "Status",
                        "Last Updated By",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((a) => (
                      <tr
                        key={a.id}
                        onClick={() =>
                          navigate(`/tracker/activity/${a.id}/details`)
                        }
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-gray-800 truncate max-w-xs">
                            {a.title}
                          </p>
                          <p className="text-xs text-gray-400 truncate max-w-xs mt-0.5">
                            {a.description}
                          </p>
                        </td>
                        <td className="px-5 py-3.5 text-gray-500 font-mono text-xs whitespace-nowrap">
                          {a.scheduled_for
                            ? format(new Date(a.scheduled_for), "h:mm a")
                            : "—"}
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${STATUS_STYLES[a.status]}`}
                          >
                            {a.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-gray-500 text-xs">
                          {a.latest_log?.user?.name ?? "Not updated yet"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
