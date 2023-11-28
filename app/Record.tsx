import React from "react";

interface RecordProps {
  day: number;
  isSelected: boolean;
  onSquareClick: () => void;
}

const Record: React.FC<RecordProps> = ({ day, isSelected, onSquareClick }) => {
  const squareStyle = {
    backgroundColor: isSelected ? "blue" : "white",
  };

  return (
    <div
      onClick={onSquareClick}
      style={squareStyle}
      className="flex items-center justify-center w-6 h-6 bg-white m-2 cursor-pointer"
    >
      <span className={isSelected ? "text-white" : "text-gray-400"}>{day}</span>
    </div>
  );
};

export default Record;
