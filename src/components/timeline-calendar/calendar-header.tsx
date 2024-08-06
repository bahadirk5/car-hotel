// components/CalendarHeader.tsx
import React from "react";
import dayjs from "dayjs";

interface CalendarHeaderProps {
  currentDate: dayjs.Dayjs;
  daysCount: number;
}

export function CalendarHeader({
  currentDate,
  daysCount,
}: CalendarHeaderProps) {
  return (
    <div className="flex border-b bg-white">
      <div className="w-[250px] flex-shrink-0 p-4 text-xl font-semibold">
        {currentDate.format("MMMM YYYY")}
      </div>
      {Array.from({ length: daysCount }).map((_, index) => {
        const date = currentDate.add(index, "day");
        return (
          <div
            key={date.format("YYYY-MM-DD")}
            className="w-[100px] flex-shrink-0 border-r p-2 text-center"
          >
            <div className="font-semibold">{date.format("ddd D")}</div>
          </div>
        );
      })}
    </div>
  );
}
