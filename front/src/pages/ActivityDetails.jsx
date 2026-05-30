import React, { useState } from "react";
import { useActivityDetails } from "../services/api/tanstack";
import { useParams } from "react-router-dom";
import Header from "../component/Header";
import {
  Avatar,
  CircularProgress,
  Divider,
  Chip,
  MenuItem,
} from "@mui/material";
import {
  Clock05Icon,
  Edit02Icon,
  Note03Icon,
  NoteDoneIcon,
} from "hugeicons-react";
import { format } from "date-fns";
import MenuDropDown from "../component/MenuDropDown";
import EditActivity from "../component/pops/EditActivity";
import LogItem from "../component/cards/LogItem";
import UpdateActivyStatus from "../component/pops/UpdateActivyStatus";
import images from "../utils/images";

const STATUS_COLORS = {
  pending: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-400" },
  completed: {
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-400",
  },
  cancelled: { bg: "bg-red-100", text: "text-red-600", dot: "bg-red-400" },
};

// function LogItem({ log, isLast }) {
//   const style = STATUS_COLORS[log.new_status] ?? STATUS_COLORS.pending;

//   return (
//     <div className="flex gap-4">
//       {/* Timeline spine */}
//       <div className="flex flex-col items-center">
//         <div className={`w-3 h-3 rounded-full shrink-0 mt-1 ${style.dot}`} />
//         {!isLast && <div className="w-px flex-1 bg-gray-200 mt-1" />}
//       </div>

//       {/* Content */}
//       <div className={`flex-1 pb-5 ${isLast ? "" : ""}`}>
//         {/* Who + when */}
//         <div className="flex items-center gap-2 flex-wrap mb-1">
//           <Avatar sx={{ width: 22, height: 22, fontSize: 11 }}>
//             {log.user?.name?.[0]}
//           </Avatar>
//           <span className="font-semibold text-sm text-gray-800">
//             {log.user?.name}
//           </span>
//           <span className="text-gray-400 text-xs">{log.user?.department}</span>
//           <span className="text-gray-300 text-xs">·</span>
//           <span className="text-xs text-gray-400 font-mono">
//             {format(new Date(log.log_date), "MMM d, yyyy · h:mm a")}
//           </span>
//         </div>

//         {/* Status transition */}
//         <div className="flex items-center gap-1.5 mb-2">
//           <span
//             className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[log.old_status]?.bg} ${STATUS_COLORS[log.old_status]?.text}`}
//           >
//             {log.old_status}
//           </span>
//           <span className="text-gray-400 text-xs">→</span>
//           <span
//             className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}
//           >
//             {log.new_status}
//           </span>
//         </div>

//         {/* Remarks */}
//         {log.remarks && (
//           <p className="text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 leading-relaxed">
//             {log.remarks}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

export default function ActivityDetails() {
  const { id } = useParams();
  const { data: activity, isLoading } = useActivityDetails(id);
  const [editOpen, setEditOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center h-full w-full justify-center">
        <CircularProgress />
      </div>
    );
  }

  const isToday =
    format(new Date(activity?.scheduled_for), "yyyy-MM-dd") ===
    format(new Date(), "yyyy-MM-dd");

  const style = STATUS_COLORS[activity?.status] ?? STATUS_COLORS.pending;
  const logs = activity?.logs ?? [];

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <Header
        title={"Activity Details"}
        limWidth={true}
        options={
          <div>
            {activity.status === "pending" && (
              <MenuDropDown
                items={[
                  {
                    label: (
                      <p className="flex items-center gap-1 text-sm text-gray-800">
                        <Edit02Icon size={18} />
                        Edit Activity
                      </p>
                    ),
                    onClick: () => setEditOpen(true), // 👈 just set state
                  },
                  {
                    label: (
                      <p className="flex items-center gap-1 text-sm text-gray-800">
                        <NoteDoneIcon size={18} />
                        Update Activity State
                      </p>
                    ),
                    onClick: () => setUpdateOpen(true), // 👈 just set state
                  },
                ]}
              />
            )}
          </div>
        }
      />
      <section className="innerPageWidth py-6">
        <div>
          {/* Title + status */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <p className="font-montserrat text-2xl text-gray-800 font-bold">
              {activity?.title}
            </p>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 mt-1 ${style.bg} ${style.text}`}
            >
              {activity?.status}
            </span>
          </div>
          <p className="mb-3 text-gray-700 leading-relaxed">
            {activity?.description}
          </p>
        </div>

        <Divider sx={{ my: 2 }} />

        {/* Meta grid */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="mb-3 font-medium text-xs text-gray-400 uppercase tracking-wider">
              Created By
            </p>
            <div className="flex items-center gap-2">
              <Avatar src={images.profile} />
              <div>
                <p className="font-jakarta font-semibold text-gray-900 text-sm">
                  {activity?.creator?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {activity?.creator?.department}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-3 font-medium text-xs text-gray-400 uppercase tracking-wider">
              Scheduled For
            </p>
            <div className="flex items-center gap-2">
              <Clock05Icon size={20} className="text-gray-400" />
              <div>
                <p className="font-jakarta font-semibold text-gray-900 text-sm">
                  {activity?.scheduled_for
                    ? format(new Date(activity?.scheduled_for), "h:mm a")
                    : "No time set"}
                </p>
                <p className="text-xs text-gray-500">
                  {isToday
                    ? "Today"
                    : activity?.scheduled_for
                      ? format(new Date(activity.scheduled_for), "MMM d, yyyy")
                      : "—"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-3 font-medium text-xs text-gray-400 uppercase tracking-wider">
              Created At
            </p>
            <div className="flex items-center gap-2">
              <Note03Icon size={20} className="text-gray-400" />
              <div>
                <p className="font-jakarta font-semibold text-gray-900 text-sm">
                  {format(new Date(activity?.created_at), "MMM d, yyyy")}
                </p>
                <p className="text-xs text-gray-500">
                  {format(new Date(activity?.created_at), "h:mm a")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Divider sx={{ my: 3 }} />

        <div>
          <div className="mb-5">
            <p className="font-jakarta text-xl font-bold text-gray-800">
              Activity Timeline
            </p>

            <p className="text-xs text-gray-500 mt-0.5">
              Recent updates and status changes .
              <span className="text-xs text-gray-700 font-semibold bg-gray-100 px-3 py-1 rounded-full">
                {logs.length} {logs.length === 1 ? "event" : "events"}
              </span>
            </p>
          </div>

          {logs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <p className="text-gray-400 text-sm">
                No updates logged for this activity yet.
              </p>
            </div>
          ) : (
            <div className="">
              {logs.map((log, i) => (
                <LogItem
                  key={log.id}
                  log={log}
                  isLast={i === logs.length - 1}
                  number={logs.length - i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dialog lives outside the menu entirely */}
      <EditActivity
        activity={activity}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />

      {/* Dialog lives outside the menu entirely */}
      <UpdateActivyStatus
        activity={activity}
        open={updateOpen}
        onClose={() => setUpdateOpen(false)}
      />
    </div>
  );
}
