import { Avatar, Divider } from "@mui/material";
import React from "react";
import images from "../../utils/images";
import {
  CheckmarkCircle02Icon,
  Cancel01Icon,
  Clock01Icon,
  Note04Icon,
  Clock02Icon,
} from "hugeicons-react";
import { format, formatDistanceToNow } from "date-fns";

export default function LogItem({ log, number, isLast }) {
  const config = STATUS_CONFIG[log.new_status];
  const isStatusChange = log.old_status !== log.new_status;
  const logColor = LogColor(log.old_status, log.new_status);

  return (
    <div className="max-h-max flex gap-2">
      {/* side note */}
      <div className="flex flex-col items-center">
        <div
          className={`p-2 ${LogColor(log.old_status, log.new_status)} max-w-max rounded-4xl`}
        >
          <Note04Icon size={18} />
        </div>
        {!isLast && <div className="border-s flex-1 border-gray-300" />}
      </div>

      {/* card  content*/}
      <div className="flex-1 bg-amber-30">
        <header className="mb-2">
          <div className="flex gap-1 items-center">
            <Avatar src={images.profile} />
            <div>
              <div className="flex flex-wrap items-center gap-1 text-sm">
                <span className="font-semibold text-gray-800">
                  {log.user?.name}
                </span>
                {isStatusChange && (
                  <span className="text-gray-500">{config.text}</span>
                )}
                <span className="text-xs font-medium">. {formatDistanceToNow(new Date(log.created_at))} ago</span>
                <span className="text-xs font-medium">. {number}</span>
              </div>
              <p className="text-xs text-gray-700">
                {log.user.department || "Department NA"}
              </p>
            </div>
          </div>
        </header>

        <div className="mb-6 bg-white p-3 rounded-2xl flex">
          <div
            className={`${logColor} self-stretch w-[2px] mr-2 rounded-2xl shrink-0`}
          />
          <div>
            <p className="mb-2">{log.remarks}</p>
            <div className="flex items-center gap-1 text-gray-700">
              <Clock02Icon size={19} />
              <span className="text-xs whitespace-nowrap">
                {format(new Date(log.log_date), "MMM d · h:mm a")}
              </span>
            </div>
            <div className="text-xs text-gray-500 font-medium italic">
              Status track :{" "}
              {isStatusChange
                ? `Activity was updated from ${log.old_status} to ${log.new_status}`
                : "No status change. Just details editting"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogColor(old_status, new_status) {
  if (old_status === new_status) return "bg-amber-500 text-black";
  if(new_status === 'cancelled') return "bg-red-700 text-white"
  return "bg-blue-600 text-white";
}

const STATUS_CONFIG = {
  pending: {
    text: "marked this activity as pending",
  },

  completed: {
    text: "completed this activity",
  },

  cancelled: {
    text: "cancelled this activity",
  },
};

// import { Avatar, Chip } from "@mui/material";
// import { format } from "date-fns";
// import {
//     CheckmarkCircle02Icon,
//     Cancel01Icon,
//     Clock01Icon,
//     Note04Icon,
//   } from "hugeicons-react";

//   const STATUS_CONFIG = {
//     pending: {
//       icon: Clock01Icon,
//       bg: "bg-amber-50",
//       iconBg: "bg-amber-100",
//       iconColor: "text-amber-600",
//       text: "marked this activity as pending",
//     },

//     completed: {
//       icon: CheckmarkCircle02Icon,
//       bg: "bg-green-50",
//       iconBg: "bg-green-100",
//       iconColor: "text-green-600",
//       text: "completed this activity",
//     },

//     cancelled: {
//       icon: Cancel01Icon,
//       bg: "bg-red-50",
//       iconBg: "bg-red-100",
//       iconColor: "text-red-600",
//       text: "cancelled this activity",
//     },
//   };

//   export default function LogItem({ log, isLast }) {
//     const config =
//       STATUS_CONFIG[log.new_status] ?? STATUS_CONFIG.pending;

//     const Icon = config.icon;

//     return (
//       <div className="flex gap-3 relative">
//         {/* Timeline */}
//         <div className="flex flex-col items-center">
//           <div
//             className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm z-10 bg-blue-500 text-white`}
//           >
//             {/* {log.id} */}
//             {/* <Icon size={15}/> */}
//             <Note04Icon size={17}/>
//           </div>

//           {!isLast && (
//             <div className="w-px flex-1 bg-gray-200 min-h-[60px]" />
//           )}
//         </div>

//         {/* Content */}
//         <div className="flex-1 pb-6">
//           <div
//             className={``}
//           >
//             {/* Header */}
//             <div className="flex items-start justify-between gap-3">
//               <div className="flex items-center gap-2 flex-wrap">
//                 <Avatar
//                   sx={{
//                     width: 30,
//                     height: 30,
//                     fontSize: 12,
//                   }}
//                 >
//                   {log.user?.name?.[0]}
//                 </Avatar>

//                 <div className="flex flex-wrap items-center gap-1 text-sm">
//                   <span className="font-semibold text-gray-800">
//                     {log.user?.name}
//                   </span>

//                   <span className="text-gray-500">
//                     {config.text}
//                   </span>
//                 </div>
//               </div>

//               <span className="text-xs text-gray-400 whitespace-nowrap">
//                 {format(
//                   new Date(log.log_date),
//                   "MMM d · h:mm a"
//                 )}
//               </span>
//             </div>

//             {/* Department */}
//             {/* {log.user?.department && (
//               <p className="text-xs text-gray-400 mt-1 ml-8">
//                 {log.user.department}
//               </p>
//             )} */}

//             {/* Remarks */}
//             {log.remarks && (
//               <div className="mt-3 ml-8">
//                 <div className="bg-white border border-gray-100 rounded-xl px-3 py-2">
//                   <p className="text-sm text-gray-600 leading-relaxed">
//                     {log.remarks}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Status Change */}
//             <div className="flex items-center gap-2 mt-3 ml-8">
//               <span className="text-[11px] text-gray-400 uppercase tracking-wide">
//                 Status
//               </span>

//               <Chip
//                 label={log.old_status}
//                 size="small"
//                 sx={{
//                   height: 22,
//                   fontSize: 11,
//                   background: "#F3F4F6",
//                 }}
//               />

//               <span className="text-gray-400 text-xs">→</span>

//               <Chip
//                 label={log.new_status}
//                 size="small"
//                 color={
//                   log.new_status === "completed"
//                     ? "success"
//                     : log.new_status === "cancelled"
//                       ? "error"
//                       : "warning"
//                 }
//                 sx={{
//                   height: 22,
//                   fontSize: 11,
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
