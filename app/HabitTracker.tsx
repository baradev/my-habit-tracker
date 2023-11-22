"use client";

import { useState } from "react";
import styles from "./HabitTracker.module.css";

const HabitTracker = () => {
  const [dayStatus, setDayStatus] = useState({});

  const toggleStatus = (day) => {
    setDayStatus((prevStatus) => ({
      ...prevStatus,
      [day]: prevStatus[day] === "success" ? "failure" : "success",
    }));
  };

  return (
    <div className={styles.habitTracker}>
      {[...Array(30)].map((_, index) => {
        const day = index + 1;
        const status = dayStatus[day];

        return (
          <div
            key={day}
            className={`${styles.habitDay} ${
              status === "success" ? styles.success : styles.failure
            }`}
            onClick={() => toggleStatus(day)}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
};

export default HabitTracker;
