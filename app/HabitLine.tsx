"use client";
import React, { useState, useEffect } from "react";
import Record from "./Record";

interface Habit {
  color: string;
  name: string;
  id: string;
  days: number;
}

interface HabitLineProps {
  habit: Habit;
}

const HabitLine: React.FC<HabitLineProps> = ({ habit }) => {
  // Load selected days from local storage on component mount
  const initialSelectedDays = JSON.parse(
    localStorage.getItem(`selectedDays-${habit.id}`) || "[]"
  );
  const [selectedDays, setSelectedDays] =
    useState<number[]>(initialSelectedDays);

  useEffect(() => {
    // Save selected days to local storage whenever the selection changes
    localStorage.setItem(
      `selectedDays-${habit.id}`,
      JSON.stringify(selectedDays)
    );
  }, [selectedDays, habit.id]);

  const handleSquareClick = (day: number) => {
    // Toggle the selected state of the day
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      } else {
        return [...prevSelectedDays, day];
      }
    });
  };

  return (
    <div className={`flex items-center m-3 bg-lime-100 mr-20`}>
      <div className="w-80 p-4">
        <h2>{habit.name}</h2>
      </div>
      <div className="flex">
        {/* Map over the days and render the Record component for each day */}
        {Array.from({ length: habit.days }, (_, index) => (
          <Record
            key={index + 1}
            day={index + 1}
            isSelected={selectedDays.includes(index + 1)}
            onSquareClick={() => handleSquareClick(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default HabitLine;
