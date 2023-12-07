"use client";
import React, { useState, useEffect } from "react";
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
    <div className={`flex items-center m-3 ${color} mr-20`}>
      <div className="w-80 p-4">
        <h2>{habit.name}</h2>
      </div>
      <div className="flex">
        {/* Map over the days and render the Record component for each day */}
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
