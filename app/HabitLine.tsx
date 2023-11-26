import React from "react";
import dayjs from "dayjs";

interface Habit {
  color: string;
  name: string;
  id: string;
  date: string;
}

interface HabitLineProps {
  habit: Habit;
}

const HabitLine: React.FC<HabitLineProps> = ({ habit }) => {
  const daysInMonth = dayjs(habit.date).daysInMonth();

  return (
    <div className={`p-4 mt-3 bg-${habit.color}`}>
      <h2>
        {habit.name} - Days in Month: {daysInMonth}
      </h2>
    </div>
  );
};

export default HabitLine;
