import React, { useState, useEffect, ChangeEvent } from 'react'
import Record from './Record'
import dayjs from 'dayjs'
import { IHabit, IRecord } from './page'

interface HabitLineProps {
  color: string
  habit: IHabit
  currentMonth: dayjs.Dayjs
  checkedRecords: IRecord[]
  addRecordForSelectedDay: (habitId: string, date: string) => void
  onDeleteHabit: () => void
}
// ... (previous code)

const HabitLine: React.FC<HabitLineProps> = ({
  color,
  habit,
  currentMonth,
  checkedRecords,
  addRecordForSelectedDay,
  onDeleteHabit,
}) => {
  const daysInMonth = currentMonth.daysInMonth()

  // Step 1: Use a centralized habitNames state
  const [habitNames, setHabitNames] = useState<{ [habitId: string]: string }>(
    () => {
      // Retrieve habit names from local storage or set them to the default
      const storedHabitNames = localStorage.getItem('habitNames')
      return storedHabitNames ? JSON.parse(storedHabitNames) : {}
    }
  )

  // Step 2: Update habit name using the centralized habitNames state
  const habitName = habitNames[habit.id] || habit.name

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Update the centralized habitNames state
    setHabitNames((prevHabitNames) => ({
      ...prevHabitNames,
      [habit.id]: event.target.value,
    }))
  }

  const handleDeleteClick = () => {
    onDeleteHabit()
  }

  const handleSquareClick = (day: number) => {
    const date = currentMonth.date(day).format('YYYY-MM-DD')
    const habitId = habit.id

    addRecordForSelectedDay(habitId, date)
  }

  // Step 3: Update local storage when habit names change
  useEffect(() => {
    localStorage.setItem('habitNames', JSON.stringify(habitNames))
  }, [habitNames])

  return (
    <div
      className={`flex flex-wrap justify-between m-3 ${color} mx-auto max-w-screen-xl`}
    >
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0 flex items-center xl:justify-start">
        <h2 className="ml-2 font-bold">
          {/* Step 4: Update habit name */}
          <input
            type="text"
            value={habitName}
            onChange={handleNameChange}
            placeholder="New Habit"
          />
        </h2>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
      <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4">
        <div className="flex flex-wrap justify-start">
          {Array.from({ length: daysInMonth }, (_, index) => (
            <Record
              key={index + 1}
              day={index + 1}
              isSelected={checkedRecords.some(
                (record: IRecord) =>
                  record.date ===
                    currentMonth.date(index + 1).format('YYYY-MM-DD') &&
                  record.isDone === true
              )}
              onSquareClick={() => handleSquareClick(index + 1)}
              colorFilled={habit.colorFilled}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HabitLine
