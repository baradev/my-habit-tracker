import React from "react";

interface Habit {
  color: string;
  name: string;
  id: string;
  day: number;
}

interface HabitLineProps {
  habit: Habit;
}

const HabitLine: React.FC<HabitLineProps> = ({ habit }) => {
  return (
    <div className={`p-4 mt-3 bg-${habit.color}`}>
      <h2>
        {habit.name} {habit.day}
      </h2>
    </div>
  );
};

export default HabitLine;
