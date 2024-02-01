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

const HabitLine: React.FC<HabitLineProps> = ({
  color,
  habit,
  currentMonth,
  checkedRecords,
  addRecordForSelectedDay,
  onDeleteHabit,
}) => {
  const daysInMonth = currentMonth.daysInMonth()

  const [habitName, setHabitName] = useState<string>(() => {
    // Initialize the habit name from localStorage or use the default habit name
    const storedHabitNames = localStorage.getItem('habitNames')
    const habitNames = storedHabitNames ? JSON.parse(storedHabitNames) : {}
    return habitNames[habit.id] || habit.name || ''
  })

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHabitName(event.target.value)
  }

  const handleNameBlur = () => {
    // Save habit name to localStorage when input field loses focus
    const updatedHabitNames = {
      ...JSON.parse(localStorage.getItem('habitNames') || '{}'),
      [habit.id]: habitName,
    }
    localStorage.setItem('habitNames', JSON.stringify(updatedHabitNames))
  }

  const handleSquareClick = (day: number) => {
    const date = currentMonth.date(day).format('YYYY-MM-DD')
    const habitId = habit.id

    addRecordForSelectedDay(habitId, date)
  }

  return (
    <div
      className={`flex flex-wrap justify-between m-3 ${color} mx-auto max-w-screen-xl`}
    >
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0 flex items-center xl:justify-start">
        <input
          type="text"
          value={habitName}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          placeholder="New Habit"
        />
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
        <div className={`flex flex-row-reverse mr-4`}>
          <button
            className={'text-gray-400'}
            onClick={onDeleteHabit}
            aria-label={`Delete habit ${habitName}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default HabitLine
