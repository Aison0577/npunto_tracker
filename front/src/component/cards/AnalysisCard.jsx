import { Divider } from "@mui/material";

export default function AnalysisCard({ title, value, textColor, icon }){
  const Icon = icon;
  return (
    <div
      className={`${textColor} bg-gray-100 transition-colors hover:bg-gray-200 p-3 rounded-4xl mb-2 relative overflow-hidden group`}
    >
      {icon && (
        <Icon
          size={80}
          className="absolute right-[-15px] opacity-40 -rotate-12 text-gray-400 group-hover:right-[-20px] transition-all duration-700"
        />
      )}
      <div className="px-4 relative">
        <p className="text-5xl font-bold text-xgray-800 font-montserrat">
          {value}
        </p>
        <p className="text-xs text-gray-500 font-bold whitespace-nowrap">{title}</p>
      </div>
      <Divider sx={{ my: 1 }} />
    </div>
  );
};



