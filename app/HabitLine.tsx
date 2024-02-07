// HabitLine.tsx

import React, { useState, ChangeEvent } from 'react'
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

  //
  const [habitName, setHabitName] = useState<string>(() => {
    const storedHabitNames = localStorage.getItem('habitNames')
    //if there are stored habit names it parses them from json into javascript object
    const habitNames = storedHabitNames ? JSON.parse(storedHabitNames) : {}
    return habitNames[habit.id] || habit.name || ''
  })

  const [editMode, setEditMode] = useState<boolean>(false)
  const [selectedBackgroundColor, setSelectedBackgroundColor] =
    useState<string>(habit.color)
  const [selectedColorFilled, setSelectedColorFilled] = useState<string>(
    habit.colorFilled
  )

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHabitName(event.target.value)
  }

  // save data when lose focus
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
    // save updated habit name to local storage
    handleNameBlur()

    // Update the default colors with the selected background color
    const updatedColors = defaultColors.map((color) =>
      color.color === selectedBackgroundColor
        ? {
            ...color,
            color: selectedBackgroundColor,
            colorFilled: selectedColorFilled,
          }
        : color
    )

    // Save updated colors to local storage
    localStorage.setItem('defaultColors', JSON.stringify(updatedColors))

    // Toggle edit mode
    toggleEditMode()

    // Save updated habit color to local storage
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

  const handleBackgroundColorChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedColor = event.target.value
    const selectedColorData = defaultColors.find(
      (color) => color.color === selectedColor
    )
    if (selectedColorData) {
      setSelectedBackgroundColor(selectedColor)
      setSelectedColorFilled(selectedColorData.colorFilled)
    }
  }

  return (
    <div
      className={`flex flex-wrap justify-between m-3 ${selectedBackgroundColor} mx-auto max-w-screen-xl`}
    >
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0 flex items-center xl:justify-start">
        {editMode ? (
          <>
            <input
              type="text"
              value={habitName}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              placeholder="New Habit"
            />
            <select
              value={selectedBackgroundColor}
              onChange={handleBackgroundColorChange}
            >
              {defaultColors.map((col, index) => {
                const colorName =
                  col.color.split('-')[1].charAt(0).toUpperCase() +
                  col.color.split('-')[1].slice(1)
                return (
                  <option key={index} value={col.color}>
                    {colorName}
                  </option>
                )
              })}
            </select>
          </>
        ) : (
          <span>{habitName}</span>
        )}
      </div>
      <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4">
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
        <div className={`flex flex-row-reverse mr-4`}>
          {editMode ? (
            <>
              <button className="text-gray-400" onClick={handleSave}>
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
    </div>
  )
}

export default HabitLine
