import React from "react";
import Record from "./Record";
import dayjs from "dayjs";
import { IHabit, IRecord } from "./page";

interface HabitLineProps {
  color: string;
  habit: IHabit;
  currentMonth: dayjs.Dayjs;
  checkedRecords: IRecord[];
  addRecordForSelectedDay: (habitId: string, date: string) => void;
}

const HabitLine: React.FC<HabitLineProps> = ({
  color,
  habit,
  currentMonth,
  checkedRecords,
  addRecordForSelectedDay,
}) => {
  const daysInMonth = currentMonth.daysInMonth();

  const handleSquareClick = (day: number) => {
    const date = currentMonth.date(day).format("YYYY-MM-DD");
    const habitId = habit.id;

    addRecordForSelectedDay(habitId, date);
  };

  return (
    <div className={`flex flex-wrap justify-between m-3 ${color}`}>
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0 flex items-center max-w-screen-xl xl:justify-start">
        <h2 className="ml-2 font-bold">{habit.name}</h2>
      </div>
      <div className="flex flex-wrap">
        {Array.from({ length: daysInMonth }, (_, index) => (
          <Record
            key={index + 1}
            day={index + 1}
            isSelected={checkedRecords.some(
              (record: IRecord) =>
                record.date ===
                  currentMonth.date(index + 1).format("YYYY-MM-DD") &&
                record.isDone === true
            )}
            onSquareClick={() => handleSquareClick(index + 1)}
            colorFilled={habit.colorFilled}
          />
        ))}
      </div>
    </div>
  );
};

export default HabitLine;
