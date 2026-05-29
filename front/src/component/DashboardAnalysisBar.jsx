import React from "react";
import { useDailyView } from "../services/api/tanstack";
import { format } from "date-fns";
import { Divider } from "@mui/material";
import { Calendar01Icon, Calendar02Icon, Calendar03Icon, CancelCircleIcon, Note05Icon, NoteDoneIcon, NoteEditIcon } from "hugeicons-react";

const AnalysisCard = ({ title, value, textColor, icon }) => {
  const Icon = icon;
  return (
    <div
      className={`${textColor} bg-gray-100 transition-colors hover:bg-gray-200 p-3 rounded-4xl mb-2 relative overflow-hidden group`}
    >
      {icon && <Icon size={80} className='absolute right-[-15px] opacity-40 -rotate-12 text-gray-400 group-hover:right-[-20px] transition-all duration-700' />}
      <div className="px-4">
        <p className="text-5xl font-bold text-xgray-800 font-montserrat">
          {value}
        </p>
        <p className="text-xs text-gray-500 font-bold">{title}</p>
      </div>
      <Divider sx={{ my: 1 }} />
    </div>
  );
};

// const AnalysisCard = ({ title, value, borderColor }) => {
//   return (
//     <div className={`border-4 ${borderColor} rounded-full p-6 items-center justify-center flex text-center size-40 mx-auto mb-3`}>
//       <div>
//         <p className="text-4xl font-bold text-gray-800">{value}</p>
//         <p className="text-xs text-gray-500">{title}</p>
//       </div>
//     </div>
//   );
// };

export default function DashboardAnalysisBar() {
  const today = format(new Date(), "yyyy-MM-dd");
  const { data: activities = [], isLoading } = useDailyView(today);

  const total = activities.length;
  const completed = activities.filter((a) => a.status === "completed").length;
  const pending = activities.filter((a) => a.status === "pending").length;
  const cancelled = activities.filter((a) => a.status === "cancelled").length;

  return (
    <section className="w-[20%] h-full p-4 shrink-0 bg-white border-r border-gray-300 overflow-y-auto">
      <p className="font-jakarta font-bold text-base text-gray-700">
        Activities Analysis
      </p>
      <p className="text-xs mb-5 text-gray-400 border-b pb-2 border-gray-300">
        {format(new Date(), "EEEE, MMM d")}
      </p>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="size-40 rounded-full mx-auto bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div>
          <AnalysisCard
            title="Total Today"
            value={total}
            textColor="text-gray-600"
            icon={Calendar01Icon}
          />
          <AnalysisCard
            title="Completed"
            value={completed}
            textColor="text-emerald-700"
            icon={NoteDoneIcon}
          />
          <AnalysisCard
            title="Pending"
            value={pending}
            textColor="text-amber-600"
            icon={NoteEditIcon}
          />
          <AnalysisCard
            title="Cancelled"
            value={cancelled}
            textColor="text-red-600"
            icon={CancelCircleIcon}
          />
        </div>
      )}
    </section>
  );
}
