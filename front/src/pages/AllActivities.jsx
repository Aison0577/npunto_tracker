import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search01Icon } from "hugeicons-react";
import Header from "../component/Header";
import { format } from "date-fns";
import { useDailyView } from "../services/api/tanstack";

const STATUS_STYLES = {
  pending:   "bg-amber-100 text-amber-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

const initials = (name) =>
  name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

export default function AllActivities() {
  const navigate = useNavigate();
  const { isLoading, data } = useDailyView();
  const [search, setSearch]     = useState("");
  const [status, setStatus]     = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo]     = useState("");

  const activities = data ?? [];

  const filtered = useMemo(() => {
    return activities.filter((a) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        a.title?.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q) ||
        a.creator?.name?.toLowerCase().includes(q);
      const matchStatus = !status || a.status === status;
      const scheduled   = a.scheduled_for ? new Date(a.scheduled_for) : null;
      const matchFrom   = !dateFrom || (scheduled && scheduled >= new Date(dateFrom));
      const matchTo     = !dateTo   || (scheduled && scheduled <= new Date(dateTo + "T23:59:59"));
      return matchSearch && matchStatus && matchFrom && matchTo;
    });
  }, [activities, search, status, dateFrom, dateTo]);

  const hasFilters = search || status || dateFrom || dateTo;

  return (
    <div className="bg-gray-100 min-h-full">
      <Header
        title={"All Activities"}
        description={"View and sort out assignments all in one place"}
        options={
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-3 py-2 w-64">
            <Search01Icon size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search activities..."
              className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        }
      />

      <div className="pageWidth mt-6">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <select
            className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 focus:outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2">
            <span className="text-xs text-gray-400">From</span>
            <input type="date" className="text-sm text-gray-600 focus:outline-none bg-transparent"
              value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>

          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2">
            <span className="text-xs text-gray-400">To</span>
            <input type="date" className="text-sm text-gray-600 focus:outline-none bg-transparent"
              value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>

          {hasFilters && (
            <button onClick={() => { setSearch(""); setStatus(""); setDateFrom(""); setDateTo(""); }}
              className="text-xs text-red-400 hover:text-red-600 bg-white border border-gray-200 rounded-xl px-3 py-2">
              Clear filters
            </button>
          )}

          <span className="ml-auto text-xs text-gray-400">
            {filtered.length} of {activities.length} activities
          </span>
        </div>

        {isLoading ? (
          <div className="space-y-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 h-16 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {filtered.length === 0 ? (
              <div className="p-10 text-center text-gray-400 text-sm">
                No activities found{hasFilters ? " for the selected filters." : "."}
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Details", "Creator", "Scheduled At", "Status", "Logs", "Last Updated", ""].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((act) => (
                    <tr key={act.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="max-w-xs">
                          <p className="text-sm font-bold text-gray-800 line-clamp-1">{act.title}</p>
                          <p className="text-xs text-gray-400 line-clamp-2 mt-0.5">{act.description}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {initials(act.creator?.name)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-xs whitespace-nowrap">{act.creator?.name}</p>
                            <p className="text-xs text-gray-400">{act.creator?.department}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-xs font-mono text-gray-600 whitespace-nowrap">
                          {act.scheduled_for ? format(new Date(act.scheduled_for), "MMM d, yyyy") : "—"}
                        </p>
                        <p className="text-xs text-gray-400 font-mono">
                          {act.scheduled_for ? format(new Date(act.scheduled_for), "h:mm a") : ""}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${STATUS_STYLES[act.status]}`}>
                          {act.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {act.logs_count ?? 0}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        {act.latest_log ? (
                          <div>
                            <p className="text-xs text-gray-600 whitespace-nowrap">{act.latest_log.user?.name}</p>
                            <p className="text-xs text-gray-400 font-mono">
                              {format(new Date(act.latest_log.log_date), "MMM d · h:mm a")}
                            </p>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-300 italic">No updates yet</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button onClick={() => navigate(`/tracker/activity/${act.id}/details`)}
                          className="text-xs text-primary font-medium hover:underline whitespace-nowrap">
                          View →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}