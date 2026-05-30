import React from "react";
import { useDailyView } from "../services/api/tanstack";
import { format } from "date-fns";
import { Divider } from "@mui/material";
import { Calendar01Icon, CancelCircleIcon, NoteDoneIcon, NoteEditIcon } from "hugeicons-react";
import AnalysisCard from "./cards/AnalysisCard";


export default function DashboardAnalysisBar() {
  const today = format(new Date(), "yyyy-MM-dd");
  const { data: activities = [], isLoading } = useDailyView(today);

  const total = activities.length;
  const completed = activities.filter((a) => a.status === "completed").length;
  const pending = activities.filter((a) => a.status === "pending").length;
  const cancelled = activities.filter((a) => a.status === "cancelled").length;

  return (
    <section className="w-[23%] lg:w-[20%] h-full p-4 shrink-0 bg-white border-l border-gray-200 sticky top-0 overflow-auto">
      <p className="font-jakarta font-bold text-sm lg:text-base text-gray-700">
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
