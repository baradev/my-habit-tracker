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
      [habit.id]: habitName,
    }
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
      className={`flex m-3 ${selectedBackgroundColor} mx-auto max-w-screen-xl p-3 h-36`}
    >
      <div className="  w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0 flex items-center xl:justify-start">
        {editMode ? (
          <>
            <input
              type="text"
              value={habitName}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              placeholder="New Habit"
            />
            <div className="color-options">
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
          </>
        ) : (
          <span className="text-lg font-semibold ml-6">{habitName}</span>
        )}
      </div>
      <div className="flex w-full md:w-1/2 lg:w-2/3 xl:w-3/4 ">
        {!editMode && (
          <div className="flex flex-wrap justify-start ">
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
      </div>
      <div className={`flex items-end mr-4 mb-2`}>
        {editMode ? (
          <>
            <button className="mr-5 text-gray-400" onClick={handleSave}>
              Save
            </button>
            <button className="text-gray-400" onClick={onDeleteHabit}>
              Delete
            </button>
          </>
        ) : (
          <button className="text-gray-400" onClick={toggleEditMode}>
            Edit
          </button>
        )}
      </div>
    </div>
  )
}

export default HabitLine
