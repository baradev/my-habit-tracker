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
}

const HabitLine: React.FC<HabitLineProps> = ({
  color,
  habit,
  currentMonth,
  checkedRecords,
  addRecordForSelectedDay,
}) => {
  const daysInMonth = currentMonth.daysInMonth()

  // Step 1: Add state for habit name
  const [habitName, setHabitName] = useState<string>(() => {
    // Retrieve the initial habit name from local storage or set it to the default
    const storedHabitName = localStorage.getItem(`habitName-${habit.id}`)
    return storedHabitName !== null ? storedHabitName : habit.name
  })

  // Step 2: Update habit name using the useState hook
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHabitName(event.target.value)
  }

  const handleSquareClick = (day: number) => {
    const date = currentMonth.date(day).format('YYYY-MM-DD')
    const habitId = habit.id

    addRecordForSelectedDay(habitId, date)
  }

  // Step 3: Update local storage when habit name changes or component unmounts
  useEffect(() => {
    localStorage.setItem(`habitName-${habit.id}`, habitName)
  }, [habit.id, habitName])

  useEffect(() => {
    // Cleanup function to remove the stored habit name when the component unmounts
    return () => {
      localStorage.removeItem(`habitName-${habit.id}`)
    }
  }, [habit.id])

  return (
    <div
      className={`flex flex-wrap justify-between m-3 ${color} mx-auto max-w-screen-xl`}
    >
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0 flex items-center xl:justify-start">
        <h2 className="ml-2 font-bold">
          {/* Step 2: Update habit name */}
          <input type="text" value={habitName} onChange={handleNameChange} />
        </h2>
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
