import { useState } from "react";
import { format, subDays, addDays } from "date-fns";
import { Alert01Icon, ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";
import { useDailyView } from "../../services/api/tanstack";

const STATUS_BADGE = {
  pending:   "bg-amber-100 text-amber-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

export default function StaffDailyView() {
  const [date, setDate]    = useState(format(new Date(), "yyyy-MM-dd"));
  const { data, isLoading } = useDailyView(date);

  const activities    = data?.activities ?? [];
  const handoverCount = data?.handover_count ?? 0;
  const handoverItems = data?.handover_items ?? [];
  const isToday       = date === format(new Date(), "yyyy-MM-dd");

  const prevDay = () => setDate((d) => format(subDays(new Date(d + "T00:00:00"), 1), "yyyy-MM-dd"));
  const nextDay = () => setDate((d) => format(addDays(new Date(d + "T00:00:00"), 1), "yyyy-MM-dd"));

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="font-jakarta text-2xl font-bold text-gray-800">Daily Handover</h1>
        <p className="text-gray-400 text-sm mt-1">View all activity updates for any day</p>
      </div>

      {/* Date nav */}
      <div className="flex items-center gap-3 mb-6 bg-white rounded-2xl border border-gray-100 p-3">
        <button onClick={prevDay} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft01Icon size={16} />
        </button>
        <div className="flex-1 text-center">
          <span className="font-semibold text-gray-800">
            {format(new Date(date + "T00:00:00"), "EEEE, MMMM d, yyyy")}
          </span>
          {isToday && (
            <span className="ml-2 text-xs bg-primary/10 text-primary font-medium px-2 py-0.5 rounded-full">Today</span>
          )}
        </div>
        <input type="date"
          className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          value={date} onChange={(e) => setDate(e.target.value)} />
        <button onClick={nextDay} disabled={isToday} className="p-2 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-30">
          <ArrowRight01Icon size={16} />
        </button>
      </div>

      {/* Handover alert */}
      {handoverCount > 0 && (
        <div className="mb-5 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
          <Alert01Icon size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">
              {handoverCount} pending {handoverCount === 1 ? "task" : "tasks"} need handover
            </p>
            <p className="text-amber-700 text-xs mt-0.5">{handoverItems.join(", ")}</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="bg-white rounded-2xl h-20 animate-pulse border border-gray-100" />)}
        </div>
      ) : activities.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400 text-sm">
          No activities found for this date.
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-gray-800">{a.title}</h3>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full shrink-0 ${STATUS_BADGE[a.status]}`}>
                    {a.status}
                  </span>
                </div>
                {a.logs?.length === 0 && (
                  <p className="text-xs text-gray-400 italic">No updates logged this day.</p>
                )}
              </div>

              {a.logs?.length > 0 && (
                <div className="px-5 pb-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-3 mb-2">Update Timeline</p>
                  <div className="space-y-3">
                    {a.logs.map((log) => (
                      <div key={log.id} className="flex gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          log.new_status === "completed" ? "bg-green-400" : log.new_status === "cancelled" ? "bg-red-400" : "bg-amber-400"
                        }`} />
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                            <span className="font-semibold text-gray-700">{log.user?.name}</span>
                            <span>·</span>
                            <span>{log.user?.department}</span>
                            <span>·</span>
                            <span className="font-mono">{format(new Date(log.log_date), "h:mm a")}</span>
                            <span className={`px-2 py-0.5 rounded-full font-medium ${STATUS_BADGE[log.new_status]}`}>
                              {log.old_status} → {log.new_status}
                            </span>
                          </div>
                          {log.remarks && (
                            <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{log.remarks}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}