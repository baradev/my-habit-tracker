"use client";

import React from "react";
import { habitData } from "../page";

export default function NewHabit() {
  console.log(habitData);

  return (
    <div>
      {/* <label htmlFor={`edit-habit-${habit.id}`}>Edit Habit Name:</label>
      <input
        id={`edit-habit-${habit.id}`}
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={() => onDelete(habit.id)}>Delete</button>
      <button onClick={onCancel}>Cancel</button> */}
    </div>
  );
}
