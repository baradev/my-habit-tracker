"use client";

import React, { useState, useEffect } from "react";
import { habitData, IHabit } from "../page";

export default function Settings() {
  const [editedHabits, setEditedHabits] = useState<{ [key: string]: IHabit }>(
    {}
  );

  // Load edited habits from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("editedHabits");
    if (storedData) {
      setEditedHabits(JSON.parse(storedData));
    }
  }, []);

  // Save edited habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("editedHabits", JSON.stringify(editedHabits));
  }, [editedHabits]);

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    habitId: string
  ) => {
    setEditedHabits((prevHabits) => ({
      ...prevHabits,
      [habitId]: {
        ...prevHabits[habitId],
        name: e.target.value,
      },
    }));
  };

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    habitId: string
  ) => {
    setEditedHabits((prevHabits) => ({
      ...prevHabits,
      [habitId]: {
        ...prevHabits[habitId],
        color: e.target.value,
      },
    }));
  };

  const handleSave = (habitId: string) => {
    // Save the edited habit data or perform other actions as needed
    const editedHabit = editedHabits[habitId];
    console.log("Saving edited habit:", editedHabit);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {habitData.Habits.map((habit) => (
            <tr key={habit.id}>
              <td>
                <input
                  type="text"
                  value={editedHabits[habit.id]?.name || habit.name}
                  onChange={(e) => handleNameChange(e, habit.id)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editedHabits[habit.id]?.color || habit.color}
                  onChange={(e) => handleColorChange(e, habit.id)}
                />
              </td>
              <td>
                <button onClick={() => handleSave(habit.id)}>Save</button>
                {/* Add other action buttons if needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
