"use client";

import React, { useState, useEffect } from "react";

interface HabitTrackerProps {}

const HabitTracker: React.FC<HabitTrackerProps> = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  ); // Current month
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  ); // Current year
  const [habitName, setHabitName] = useState<string>("");
  const [habits, setHabits] = useState<string[]>([]); // Array to store habits
  const [doneHabitData, setDoneHabitData] = useState<boolean[][]>([]);

  useEffect(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const initialHabitData: boolean[][] = Array.from(
      { length: daysInMonth },
      () => Array(habits.length).fill(false)
    );
    setDoneHabitData(initialHabitData);
  }, [selectedMonth, selectedYear, habits]);

  const toggleDay = (dayIndex: number, habitIndex: number) => {
    const updatedDoneHabitData = [...doneHabitData];
    updatedDoneHabitData[dayIndex][habitIndex] =
      !doneHabitData[dayIndex][habitIndex];
    setDoneHabitData(updatedDoneHabitData);
  };

  const addHabit = () => {
    setHabits([...habits, habitName]);
    setHabitName("");
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

      <div>
        <input
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="Enter Habit Name"
        />
        <button onClick={addHabit}>Add</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", height: 30 }}>
          {Array.from({ length: doneHabitData.length }, (_, i) => (
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

        {habits.map((habit, habitIndex) => (
          <div key={habitIndex}>
            <div style={{ display: "flex", height: 30 }}>
              {doneHabitData.map((isDone, dayIndex) => (
                <div
                  key={dayIndex + 1}
                  onClick={() => toggleDay(dayIndex, habitIndex)}
                  style={{
                    flex: 1,
                    cursor: "pointer",
                    backgroundColor: isDone[habitIndex] ? "green" : "white",
                    border: "1px solid black",
                    width: 30,
                  }}
                ></div>
              ))}
            </div>
            <div>{habit}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitTracker;
