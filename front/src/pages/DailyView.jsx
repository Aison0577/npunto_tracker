import { useState } from "react";
import { format, subDays, addDays } from "date-fns";
import {
  Alert01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Clock01Icon,
} from "hugeicons-react";
import { useDailyView } from "../services/api/tanstack";
import ActivityCard from "../component/cards/ActivityCard";
import Header from "../component/Header";
import { TextField } from "@mui/material";

export default function AdminDailyView() {
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const { data, isLoading } = useDailyView(date);

  const activities = data ?? [];
  const isToday = date === format(new Date(), "yyyy-MM-dd");

  const prevDay = () =>
    setDate((d) => format(subDays(new Date(d + "T00:00:00"), 1), "yyyy-MM-dd"));
  const nextDay = () =>
    setDate((d) => format(addDays(new Date(d + "T00:00:00"), 1), "yyyy-MM-dd"));

  return (
    <div className="bg-gray-100 pb-6 min-h-screen">
      <Header
        title={"Daily Activities"}
        description={
          "Full activity log per day — track updates and manage shift handovers"
        }
      />

      <div className="pageWidth">
        {/* Date nav */}
        <div className="flex items-center gap-3 mb-6 bg-white rounded-2xl p-3 mt-4 sticky top-20 z-20">
          <button
            onClick={prevDay}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft01Icon size={16} />
          </button>
          <div className="flex-1 text-center">
            <span className="font-semibold text-gray-800">
              {format(new Date(date + "T00:00:00"), "EEEE, MMMM d, yyyy")}
            </span>
            {isToday && (
              <span className="ml-2 text-xs bg-primary/10 text-primary font-medium px-2 py-0.5 rounded-full">
                Today
              </span>
            )}
          </div>
          <input
            type="date"
            className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            onClick={nextDay}
            disabled={isToday}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-30"
          >
            <ArrowRight01Icon size={16} />
          </button>
        </div>

        {/* Activities */}
        <div className="grid grid-cols-3 gap-3">
          {isLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 h-20 animate-pulse"
                />
              ))}
            </>
          ) : activities.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400 text-sm col-span-3">
              No activities scheduled for this date.
            </div>
          ) : (
            <>
              {activities.map((a) => (
                <ActivityCard key={a.id} activity={a} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
