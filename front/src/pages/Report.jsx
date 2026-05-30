import { useState, useMemo, useRef } from "react";
import { format, subDays } from "date-fns";
import Header from "../component/Header";
import ReportFilter from "../component/pops/ReportFilter";
import { useReport } from "../services/api/tanstack";
import { Calendar01Icon, CancelCircleIcon, NoteDoneIcon, NoteEditIcon, PrinterIcon, RepositoryIcon } from "hugeicons-react";
import AnalysisCard from "../component/cards/AnalysisCard";

const STATUS_BADGE = {
  pending: "bg-amber-100 text-amber-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

const ACTION_BADGE = {
  editted: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

export default function Report() {
  const [filters, setFilters] = useState({
    from: format(subDays(new Date(), 7), "yyyy-MM-dd"),
    to: format(new Date(), "yyyy-MM-dd"),
    status: "",
    activity_id: "",
    user_id: "",
  });

  const [submitted, setSubmitted] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");

  const { data, isLoading, isFetching } = useReport(submitted, !!submitted);

  const allLogs = data?.logs ?? [];
  const summary = data?.summary ?? {
    total: 0,
    completed: 0,
    pending: 0,
    cancelled: 0,
  };

  const logs = useMemo(() => {
    return allLogs.filter((l) => {
      const matchStatus = !statusFilter || l.new_status === statusFilter;
      const matchAction = !actionFilter || l.action_type === actionFilter;
      return matchStatus && matchAction;
    });
  }, [allLogs, statusFilter, actionFilter]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #printable-report, #printable-report * { visibility: visible; }
          #printable-report { position: absolute; top: 0; left: 0; width: 100%; }
          .no-print { display: none !important; }
          table { page-break-inside: auto; font-size: 11px; }
          tr { page-break-inside: avoid; page-break-after: auto; }
          thead { display: table-header-group; }
          @page { margin: 20mm; size: A4 landscape; }
        }
      `}</style>

      <div className="bg-gray-100 min-h-full">
        <Header
          title={"Activity Reports"}
          description={
            "Query activity update history with custom date ranges and filters"
          }
          options={
            <ReportFilter
              filters={filters}
              setFilters={setFilters}
              isFetching={isFetching}
              onRun={() => setSubmitted({ ...filters })}
            />
          }
        />

        <main className="pageWidth pt-6" id="printable-report">

          {/* Print header — only visible when printing */}
          {submitted && (
            <div className="hidden print:block mb-4">
              <h1 className="text-lg font-bold text-gray-800">Npontu Activity Report</h1>
              <p className="text-xs text-gray-500">
                Period: {submitted.from} → {submitted.to} &nbsp;|&nbsp; Generated: {format(new Date(), "MMM d, yyyy h:mm a")}
              </p>
            </div>
          )}

          {/* Summary stats */}
          {submitted && (
            <div className="grid grid-cols-4 gap-4 mb-6 bg-white p-2 rounded-4xl">
              {[
                {
                  label: "Total Logs",
                  value: summary.total,
                  color: "text-gray-800",
                  icon: Calendar01Icon,
                },
                {
                  label: "Completed",
                  value: summary.completed,
                  color: "text-emerald-800",
                  icon: NoteDoneIcon,
                },
                {
                  label: "Pending",
                  value: summary.pending,
                  color: "text-amber-600",
                  icon: NoteEditIcon,
                },
                {
                  label: "Cancelled",
                  value: summary.cancelled,
                  color: "text-red-500",
                  icon: CancelCircleIcon,
                },
              ].map((s) => (
                <div key={s.label}>
                  <AnalysisCard
                    title={s.label}
                    value={s.value}
                    textColor={s.color}
                    icon={s.icon}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Logs table */}
          {submitted && (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <p className="font-semibold text-gray-700 text-sm">Log Records</p>
                <div className="flex items-center gap-3">
                  {/* Filters — hidden on print */}
                  <div className="no-print flex items-center gap-3">
                    <select
                      className="border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-600 focus:outline-none"
                      value={actionFilter}
                      onChange={(e) => setActionFilter(e.target.value)}
                    >
                      <option value="">All Actions</option>
                      <option value="editted">Editted</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <select
                      className="border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-600 focus:outline-none"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">All Statuses</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <span className="text-xs text-gray-400">{logs.length} records</span>

                  {/* Print button */}
                  {logs.length > 0 && (
                    <button
                      onClick={handlePrint}
                      className="no-print flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium px-3 py-1.5 rounded-xl transition-colors"
                    >
                      <PrinterIcon size={14} />
                      Print
                    </button>
                  )}
                </div>
              </div>

              {isLoading ? (
                <div className="p-8 text-center text-gray-400 text-sm">
                  Running report...
                </div>
              ) : logs.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm">
                  No records found for the selected filters.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        {[
                          "Date",
                          "Activity",
                          "Updated By",
                          "Department",
                          "Action",
                          "Change",
                          "Remarks",
                          "Time",
                        ].map((h) => (
                          <th
                            key={h}
                            className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map((log, i) => (
                        <tr
                          key={log.id}
                          className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 ? "bg-gray-50/50" : ""}`}
                        >
                          <td className="px-4 py-3 text-gray-500 font-mono text-xs whitespace-nowrap">
                            {format(new Date(log.log_date), "MMM d, yyyy")}
                          </td>
                          <td className="px-4 py-3 max-w-[180px]">
                            <p className="font-medium text-gray-800 truncate">
                              {log.activity?.title}
                            </p>
                          </td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                            {log.user?.name}
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                            {log.user?.department}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${ACTION_BADGE[log.action_type]}`}
                            >
                              {log.action_type}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_BADGE[log.old_status]}`}
                            >
                              {log.old_status}
                            </span>
                            <span className="text-gray-300 mx-1">→</span>
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_BADGE[log.new_status]}`}
                            >
                              {log.new_status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-500 max-w-[180px]">
                            <p className="truncate">{log.remarks || "—"}</p>
                          </td>
                          <td className="px-4 py-3 text-gray-400 font-mono text-xs whitespace-nowrap">
                            {format(new Date(log.log_date), "h:mm a")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {!submitted && (
            <div className="bg-white rounded-2xl border py-16 border-gray-100 p-10 text-center text-gray-400 text-sm">
              <RepositoryIcon size={70} className="mx-auto text-gray-600" />
              Use the Filter Options above to run a report.
            </div>
          )}
        </main>
      </div>
    </>
  );
}