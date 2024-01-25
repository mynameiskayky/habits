import { CheckCircle, CloudSun, List, XCircle } from "@phosphor-icons/react";
import { ReactNode } from "react";

export interface IHabitProps {
  name: string;
  icon?: ReactNode;
  habitColor?: "#7F2FE3" | "#22C55E" | "#84CC16" | "#EF4444" | "#F97316";
  timeOfDay?: "AM" | "PM";
}

export default function Habit({
  name,
  habitColor = "#22C55E",
  icon = <CloudSun size={24} />,
  timeOfDay = "AM",
}: IHabitProps) {
  return (
    <div
      className={`flex items-center justify-between gap-8 py-6 px-8 group/item hover:cursor-auto hover:bg-neutral-800/40 transition-all`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`w-10 h-10 grid place-items-center rounded-full`}
          style={{ background: habitColor }}
        >
          {icon}
        </span>
        <div>
          <h4 className="text-xl font-medium text-neutral-300 group-hover/item:text-neutral-50 transition-all">
            {name}
          </h4>
          <p className="text-xs text-neutral-400 group-hover/item:text-neutral-200 transition-all">
            {timeOfDay}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-neutral-500 group-hover/item:text-neutral-300 ">
        <div className="flex items-center gap-1">
          <CheckCircle className="p-1.5 w-10 h-10 transition-colors hover:text-green-500 cursor-pointer" />
          <XCircle className="p-1.5 w-10 h-10 transition-colors hover:text-red-500 cursor-pointer" />
        </div>
        <List className="p-1.5 w-10 h-10 border border-neutral-600 cursor-pointer hover:bg-neutral-700/60 rounded-lg transition-all hover:text-neutral-200" />
      </div>
    </div>
  );
}
