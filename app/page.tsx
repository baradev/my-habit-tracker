"use client";
import React, { useState, useEffect } from "react";
import HabitLine from "./HabitLine";
import dayjs from "dayjs";

interface Habit {
  color: string;
  name: string;
  id: string;
  days: number;
}
interface HabitData {
  Habits: Habit[];
}

interface Record {
  id: string;
  habit_id: string;
  date: number;
  isDone: boolean;
}

interface RecordData {
  Records: Record[];
}

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  useEffect(() => {
    // Retrieve the last saved month from localStorage, default to the current month
    const savedMonth = localStorage.getItem("currentMonth");
    const initialMonth = savedMonth ? dayjs(savedMonth) : dayjs();
    setCurrentMonth(initialMonth);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const changeMonth = (increment: number) => {
    const newMonth = currentMonth.add(increment, "month");

    setCurrentMonth(newMonth);

    localStorage.setItem("currentMonth", newMonth.format());
  };

  const monthYear = currentMonth.format("MMMM YYYY");
  const daysInMonth = currentMonth.daysInMonth();

  const habitData: HabitData = {
    Habits: [
      {
        color: "green-200",
        name: "Sugar free",
        id: "1",
        days: daysInMonth,
      },
      {
        color: "indigo-200",
        name: "Going to bed early",
        id: "2",
        days: daysInMonth,
      },
      {
        color: "rose-200",
        name: "Exercising",
        id: "3",
        days: daysInMonth,
      },
      {
        color: "amber-200",
        name: "Read a book",
        id: "4",
        days: daysInMonth,
      },
    ],
  };

  return (
    <main>
      <div>
        <div className="flex flex-row-reverse">
          <div className="join flex mr-20">
            <button className="join-item btn" onClick={() => changeMonth(-1)}>
              «
            </button>
            <button className="join-item btn">{monthYear}</button>
            <button className="join-item btn" onClick={() => changeMonth(1)}>
              »
            </button>
          </div>
        </div>
        {habitData.Habits.map((habit: Habit) => (
          <HabitLine key={habit.id} habit={habit} />
        ))}
      </div>
    </main>
  );
}
