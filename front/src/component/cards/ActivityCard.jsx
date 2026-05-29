import { Alert01Icon, Clock01Icon, PinIcon } from "hugeicons-react";
import { useState } from "react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

export default function ActivityCard({ activity }) {
  const navigate = useNavigate()
  const hasLogs = activity.logs?.length > 0;
  const style = STATUS_BADGE[activity.status] ?? STATUS_BADGE.pending;

  return (

      <div className="bg-white rounded-4xl border border-gray-100 overflow-hidden w-full group flex flex-col justify-between cursor-pointer" onClick={() => navigate(`/tracker/activity/${activity.id}/details`)}>
        <div
          className={`px-5 py-6 ${hasLogs ? "cursor-pointer hover:bg-gray-50" : ""} cursor-pointer transition-colors`}
          // onClick={() => hasLogs && setOpen((o) => !o)}
        >
          <div className="p-2 bg-gray-100 rounded-2xl mb-3 max-w-max">
            <PinIcon className="" />
          </div>

          <h3 className="font-semibold text-gray-800 line-clamp-2">{activity.title}</h3>
          <h3 className="text-xs line-clamp-2 mb-3 italic">
            {activity.description}
          </h3>
        </div>

        <div className="px-5 pb-4">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span
              className={`text-xs font-medium px-2.5 py-0.5 rounded-md ${style}`}
            >
              {activity.status}
            </span>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <Clock01Icon size={13} />
            {activity.scheduled_for
              ? format(new Date(activity.scheduled_for), "h:mm a")
              : "No time set"}
            {" · "}Created by {activity.creator?.name.split(' ')[0]}
          </p>
        </div>
      </div>

  );
}

const STATUS_COLORS = {
  pending: "bg-amber-400",
  completed: "bg-green-400",
  cancelled: "bg-red-400",
};

const STATUS_BADGE = {
  pending: "bg-amber-100 text-amber-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
};

function LogEntry({ log }) {
  return (
    <div className="flex gap-3 py-2.5">
      <div className="flex flex-col items-center gap-1 mt-1">
        <div
          className={`w-2.5 h-2.5 rounded-full shrink-0 ${STATUS_COLORS[log.new_status]}`}
        />
        <div className="w-px flex-1 bg-gray-100 min-h-[16px]" />
      </div>
      <div className="flex-1 pb-1">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <span className="font-semibold text-gray-700">{log.user?.name}</span>
          <span>·</span>
          <span>{log.user?.department}</span>
          <span>·</span>
          <span className="font-mono">
            {format(new Date(log.log_date), "h:mm a")}
          </span>
          <span
            className={`ml-1 px-2 py-0.5 rounded-full font-medium ${STATUS_BADGE[log.new_status]}`}
          >
            {log.old_status} → {log.new_status}
          </span>
        </div>
        {log.remarks && (
          <p className="mt-1 text-sm text-gray-600 leading-relaxed">
            {log.remarks}
          </p>
        )}
      </div>
    </div>
  );
}
