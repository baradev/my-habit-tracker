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
  const renderSquares = () => {
    // Create an array with 'habit.days' elements
    const daysArray = Array.from(
      { length: habit.days },
      (_, index) => index + 1
    );

    // Map over the array to generate the squares with numbers
    return daysArray.map((day) => (
      <div
        key={day}
        className="flex items-center justify-center w-6 h-6 bg-white m-2"
      >
        <span className="text-gray-400">{day}</span>
      </div>
    ));
  };

  return (
    <div className="flex items-center m-3 bg-green-200 mr-20">
      <div className="w-80 p-4">
        <h2>{habit.name}</h2>
      </div>
      <div className="flex">{renderSquares()}</div>
    </div>
  );
};

export default HabitLine;
