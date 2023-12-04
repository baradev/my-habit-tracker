"use client";
import React, { useState, useEffect } from "react";
import HabitLine from "./HabitLine";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

export interface IHabit {
  color: string;
  name: string;
  id: string;
}
interface IHabitData {
  Habits: IHabit[];
}

export interface IRecord {
  id: string;
  habitId: string;
  date: string;
  isDone: boolean;
}

interface IRecordData {
  Records: IRecord[];
}

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  useEffect(() => {
    // Retrieve the last saved month from localStorage, default to the current month
    const savedMonth = localStorage.getItem("currentMonth");
    const initialMonth = savedMonth ? dayjs(savedMonth) : dayjs();
    setCurrentMonth(initialMonth);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    const savedRecords = localStorage.getItem("recordData");
    const initialRecords = savedRecords ? JSON.parse(savedRecords) : [];
    setRecordData(initialRecords);
  }, []);

  const defaultRecordData: IRecordData = {
    Records: [
      {
        id: uuidv4(),
        habitId: "1",
        date: "2023-12-01",
        isDone: true,
      },
      {
        id: uuidv4(),
        habitId: "1",
        date: "2023-12-02",
        isDone: true,
      },
      {
        id: uuidv4(),
        habitId: "1",
        date: "2023-12-03",
        isDone: true,
      },
      {
        id: uuidv4(),
        habitId: "3",
        date: "2023-12-13",
        isDone: true,
      },
      {
        id: uuidv4(),
        habitId: "3",
        date: "2023-12-14",
        isDone: true,
      },
      {
        id: uuidv4(),
        habitId: "4",
        date: "2023-12-07",
        isDone: true,
      },
      {
        id: uuidv4(),
        habitId: "4",
        date: "2023-12-08",
        isDone: true,
      },
      {
        id: uuidv4(),
        habitId: "4",
        date: "2023-10-01",
        isDone: false,
      },
    ],
  };

  const [recordData, setRecordData] = useState<IRecord[]>(
    defaultRecordData.Records
  );

  const changeMonth = (increment: number) => {
    const newMonth = currentMonth.add(increment, "month");

    setCurrentMonth(newMonth);

    localStorage.setItem("currentMonth", newMonth.format());
  };

  const resetToCurrentDay = () => {
    setCurrentMonth(dayjs());
    localStorage.setItem("currentMonth", dayjs().format());
  };

  const monthYear = currentMonth.format("MMMM YYYY");

  const addRecordForSelectedDay = (habitId: string, date: string) => {
    const existingRecordIndex = recordData.findIndex(
      (record) => record.habitId === habitId && record.date === date
    );

    if (existingRecordIndex !== -1) {
      // If the record exists, toggle the isDone property and update the color
      const updatedRecordData = [...recordData];
      updatedRecordData[existingRecordIndex] = {
        ...updatedRecordData[existingRecordIndex],
        isDone: !updatedRecordData[existingRecordIndex].isDone,
      };

      setRecordData(updatedRecordData);

      // Update localStorage with the updated records
      localStorage.setItem("recordData", JSON.stringify(updatedRecordData));
    } else {
      // If the record doesn't exist, add a new record for the selected day
      const newRecord: IRecord = {
        id: uuidv4(),
        habitId,
        date,
        isDone: true,
      };

      setRecordData((prevRecords) => [...prevRecords, newRecord]);

      // Update localStorage with the updated records
      localStorage.setItem(
        "recordData",
        JSON.stringify([...recordData, newRecord])
      );
    }
  };

  const habitData: IHabitData = {
    Habits: [
      {
        color: "green-200",
        name: "Sugar free",
        id: "1",
      },
      {
        color: "indigo-200",
        name: "Going to bed early",
        id: "2",
      },
      {
        color: "rose-200",
        name: "Exercising",
        id: "3",
      },
      {
        color: "amber-200",
        name: "Read a book",
        id: "4",
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
            <button className="join-item btn w">{monthYear}</button>
            <button className="join-item btn" onClick={() => changeMonth(1)}>
              »
            </button>
            <button className="join-item btn" onClick={resetToCurrentDay}>
              Today
            </button>
          </div>
        </div>
        {habitData.Habits.map((habit: IHabit) => {
          const checkedRecords = recordData.filter((record: IRecord) => {
            return (
              record.habitId === habit.id &&
              record.date.includes(currentMonth.format("YYYY-MM"))
            );
          });

          return (
            <HabitLine
              key={habit.id}
              habit={habit}
              currentMonth={currentMonth}
              checkedRecords={checkedRecords}
              addRecordForSelectedDay={addRecordForSelectedDay}
            />
          );
        })}
      </div>
    </main>
  );
}
