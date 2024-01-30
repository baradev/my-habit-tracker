'use client'

import React, { useState } from 'react'

export default function Settings() {
  const [habits, setHabits] = useState(['', '', '', '', ''])

  const handleHabitChange = (index, value) => {
    const newHabits = [...habits]
    newHabits[index] = value
    setHabits(newHabits)
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Habit</th>
            <th>Color</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={habit}
                  onChange={(e) => handleHabitChange(index, e.target.value)}
                />
              </td>
              <td>{/* You can add a color input here if needed */}</td>
              <td>{/* You can add action buttons here if needed */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
