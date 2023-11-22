"use client";

import React, { useState } from "react";

const HabitTracker = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Current year

  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const initialHabitData = Array.from({ length: daysInMonth }, () => false);
  const [habitData, setHabitData] = useState(initialHabitData);

  const toggleDay = (dayIndex) => {
    const updatedHabitData = [...habitData];
    updatedHabitData[dayIndex] = !habitData[dayIndex];
    setHabitData(updatedHabitData);
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

      <table className="table-fixed, border ">
        <tr>
          <td>Day</td>
          {Array.from({ length: daysInMonth }, (_, i) => (
            <th key={i + 1} className="border">
              {i + 1}
            </th>
          ))}
        </tr>

        <tr>
          <td>Status</td>
          {habitData.map((isDone, index) => (
            <td
              key={index + 1}
              onClick={() => toggleDay(index)}
              style={{
                cursor: "pointer",
                backgroundColor: isDone ? "green" : "white",
              }}
              className="border"
            ></td>
          ))}
        </tr>
      </table>
    </div>
  );
};

export default HabitTracker;
