"use client";

// pages/index.js
import { useState } from "react";
import styles from "./HabitTracker.module.css";

const HabitTracker = () => {
  const [completedDays, setCompletedDays] = useState([]);

  const toggleCompleted = (day) => {
    const updatedDays = [...completedDays];
    const index = updatedDays.indexOf(day);

    if (index === -1) {
      updatedDays.push(day);
    } else {
      updatedDays.splice(index, 1);
    }

    setCompletedDays(updatedDays);
  };

  return (
    <div className={styles.habitTracker}>
      {[...Array(30)].map((_, index) => (
        <div
          key={index + 1}
          className={`${styles.habitDay} ${
            completedDays.includes(index + 1) ? styles.completed : ""
          }`}
          onClick={() => toggleCompleted(index + 1)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default HabitTracker;
