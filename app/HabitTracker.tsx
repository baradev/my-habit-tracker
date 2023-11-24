"use client";
import React, { useState } from "react";

const HabitTracker = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Current year

  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const initialHabitData = Array.from({ length: daysInMonth }, () => false);
  const [doneHabitData, setDoneHabitData] = useState(initialHabitData);

  const toggleDay = (dayIndex: number) => {
    const updatedDoneHabitData = [...doneHabitData];
    updatedDoneHabitData[dayIndex] = !doneHabitData[dayIndex];
    setDoneHabitData(updatedDoneHabitData);
  };

  return (
    <div>
      <div>
        <label>
          Month:{" "}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(2000, i, 1).toLocaleString("en-us", {
                  month: "long",
                })}
              </option>
            ))}
          </select>
        </label>

        <label>
          Year:{" "}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", height: 30 }}>
          {Array.from({ length: daysInMonth }, (_, i) => (
            <div
              key={i + 1}
              style={{
                flex: 1,
                border: "1px solid black",
                textAlign: "center",
                width: 30,
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", height: 30 }}>
          {doneHabitData.map((isDone, index) => (
            <div
              key={index + 1}
              onClick={() => toggleDay(index)}
              style={{
                flex: 1,
                cursor: "pointer",
                backgroundColor: isDone ? "green" : "white",
                border: "1px solid black",
                width: 30,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
