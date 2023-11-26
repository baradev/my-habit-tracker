import React from "react";

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
  return (
    <div className="flex items-center m-3  bg-green-200">
      <div className="w-80 p-4">
        <h2>
          {habit.name} {habit.days}
        </h2>
      </div>

      <div className="w-5 h-5 bg-white"></div>
    </div>
  );
};

export default HabitLine;
