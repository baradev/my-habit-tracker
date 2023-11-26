import React from "react";

interface Habit {
  color: string;
  name: string;
  id: string;
}

interface HabitLineProps {
  habit: Habit;
}

const HabitLine: React.FC<HabitLineProps> = ({ habit }) => {
  return (
    <div className={`p-4 bg-${habit.color} mt-3`}>
      <h2>{habit.name}</h2>
    </div>
  );
};

export default HabitLine;
