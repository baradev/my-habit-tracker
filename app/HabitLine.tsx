// HabitLine.tsx

import React, { useState, ChangeEvent, useEffect } from 'react'
import Record from './Record'
import dayjs from 'dayjs'
import { IHabit, IRecord } from './page'

interface HabitLineProps {
  habit: IHabit
  currentMonth: dayjs.Dayjs
  checkedRecords: IRecord[]
  addRecordForSelectedDay: (habitId: string, date: string) => void
  onDeleteHabit: () => void
  defaultColors: { color: string; colorFilled: string }[]
  habitList: IHabit[]
}

const HabitLine: React.FC<HabitLineProps> = ({
  habit,
  currentMonth,
  checkedRecords,
  addRecordForSelectedDay,
  onDeleteHabit,
  defaultColors,
  habitList,
}) => {
  const daysInMonth = currentMonth.daysInMonth()

  const [habitName, setHabitName] = useState<string>(() => {
    const storedHabitNames = localStorage.getItem('habitNames')
    const habitNames = storedHabitNames ? JSON.parse(storedHabitNames) : {}
    return habitNames[habit.id] || habit.name || ''
  })

  const [editMode, setEditMode] = useState<boolean>(
    () => habit.isEditMode || false
  ) // Set initial edit mode based on habit's isEditMode property
  const [selectedBackgroundColor, setSelectedBackgroundColor] =
    useState<string>(habit.color)
  const [selectedColorFilled, setSelectedColorFilled] = useState<string>(
    habit.colorFilled
  )

  useEffect(() => {
    setEditMode(habit.isEditMode || false) // Update edit mode when habit's isEditMode property changes
  }, [habit.isEditMode])

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHabitName(event.target.value)
  }

  const handleNameBlur = () => {
    const updatedHabitNames = {
      ...JSON.parse(localStorage.getItem('habitNames') || '{}'),
      [habit.id]: habitName.trim() || 'New Habit', // Set to 'New Habit' if input is empty
    }
    setHabitName(habitName.trim() || 'New Habit') // Update habitName state
    localStorage.setItem('habitNames', JSON.stringify(updatedHabitNames))
  }

  const handleSquareClick = (day: number) => {
    const date = currentMonth.date(day).format('YYYY-MM-DD')
    const habitId = habit.id
    addRecordForSelectedDay(habitId, date)
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const handleSave = () => {
    handleNameBlur()

    const updatedColors = defaultColors.map((color) =>
      color.color === selectedBackgroundColor
        ? {
            ...color,
            color: selectedBackgroundColor,
            colorFilled: selectedColorFilled,
          }
        : color
    )

    localStorage.setItem('defaultColors', JSON.stringify(updatedColors))

    toggleEditMode()

    const updatedHabitList = habitList.map((habitItem) =>
      habitItem.id === habit.id
        ? {
            ...habitItem,
            color: selectedBackgroundColor,
            colorFilled: selectedColorFilled,
          }
        : habitItem
    )
    const habitLocalStorageKey = `habitData_${currentMonth.format('YYYY-MM')}`
    localStorage.setItem(habitLocalStorageKey, JSON.stringify(updatedHabitList))
  }

  const handleBackgroundColorChange = (selectedColor: string) => {
    setSelectedBackgroundColor(selectedColor)
    const selectedColorData = defaultColors.find(
      (color) => color.color === selectedColor
    )
    if (selectedColorData) {
      setSelectedColorFilled(selectedColorData.colorFilled)
    }
  }

  return (
    <div
      className={`habit-line-container flex flex-col md:flex-row m-3 ${selectedBackgroundColor} mx-auto max-w-screen-xl p-3 min-h-[140px] ${
        editMode ? 'h-auto' : `h-${daysInMonth * 4}`
      }`}
    >
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0 flex items-center xl:justify-start">
        {editMode ? (
          <>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              value={habitName}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleNameBlur()
                  toggleEditMode()
                }
              }}
              placeholder="New Habit"
            />
          </>
        ) : (
          <span className="text-lg font-semibold ml-6">{habitName}</span>
        )}
      </div>
      <div className="flex w-full md:w-1/2 lg:w-2/3 xl:w-3/4 ">
        {!editMode && (
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
                colorFilled={selectedColorFilled}
              />
            ))}
          </div>
        )}
        {editMode && (
          <div className="color-options ml-4">
            {defaultColors.map((col, index) => (
              <span
                key={index}
                className={`color-dot ${
                  col.color === selectedBackgroundColor ? 'selected' : ''
                }`}
                style={{ backgroundColor: col.colorFilled }}
                onClick={() => handleBackgroundColorChange(col.color)}
              ></span>
            ))}
          </div>
        )}
      </div>
      <div className={`flex items-center mr-1 ml-3 mb-2`}>
        {editMode ? (
          <>
            <button
              className="btn btn-ghost text-gray-400"
              onClick={handleSave}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </button>

            <button
              onClick={onDeleteHabit}
              className="btn btn-ghost text-gray-400 p-2.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </>
        ) : (
          <button
            onClick={toggleEditMode}
            className="btn btn-ghost flex p-2.5 bg-grey-400 text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default HabitLine
