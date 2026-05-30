import React from "react";
import Drawer from "./SideDrawer";
import SideDrawer from "./SideDrawer";

export default function Header({
  title,
  description,
  options,
  limWidth = false,
}) {
  return (
    <div className="bg-white w-full sticky top-0 z-20">
      <div
        className={`py-4 ${limWidth ? "innerPageWidth" : "pageWidth"} flex items-center justify-between`}
      >
        <div className="flex gap-1">
          <SideDrawer />
          <div className="">
            <p className="font-jakarta text-xl font-bold text-gray-800">
              {title}
            </p>
            <p className="text-xs">
              {description || "Provice page information here"}
            </p>
          </div> 
        </div>

        <section>{options}</section>
      </div>
    </div>
  );
}
