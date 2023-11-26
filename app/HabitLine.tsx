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
  const tailwindClass = `bg-${habit.color}-100`;

  return (
    <div className="p-5 mt-5" style={{ backgroundColor: habit.color }}>
      <h2>{habit.name}</h2>
    </div>
  );
};

export default HabitLine;
