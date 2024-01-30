'use client'

import React, { useState, useEffect } from 'react'
import HabitLine from './HabitLine'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

export interface IHabit {
  color: string
  colorFilled: string
  name: string
  id: string
}

export interface IRecord {
  id: string
  habitId: string
  date: string
  isDone: boolean
}

interface IRecordData {
  Records: IRecord[]
}

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(dayjs())

  useEffect(() => {
    const savedMonth = localStorage.getItem('currentMonth')
    const initialMonth = savedMonth ? dayjs(savedMonth) : dayjs()
    setCurrentMonth(initialMonth)
  }, [])

  useEffect(() => {
    const savedRecords = localStorage.getItem('recordData')
    const initialRecords = savedRecords ? JSON.parse(savedRecords) : []
    setRecordData(initialRecords)
  }, [])

  useEffect(() => {
    const savedHabits = localStorage.getItem('habitData')
    const initialHabits = savedHabits ? JSON.parse(savedHabits) : []
    setHabitList(initialHabits)
  }, [])

  const defaultRecordData: IRecordData = {
    Records: [],
  }

  const [recordData, setRecordData] = useState<IRecord[]>(
    defaultRecordData.Records
  )

  const changeMonth = (increment: number) => {
    const newMonth = currentMonth.add(increment, 'month')
    setCurrentMonth(newMonth)
    localStorage.setItem('currentMonth', newMonth.format())
  }

  const resetToCurrentDay = () => {
    setCurrentMonth(dayjs())
    localStorage.setItem('currentMonth', dayjs().format())
  }

  const monthYear = currentMonth.format('MMMM YYYY')

  const [habitList, setHabitList] = useState<IHabit[]>([])
  const [defaultColors, setDefaultColors] = useState([
    { color: 'bg-green-200', colorFilled: '#84CC16' },
    { color: 'bg-indigo-200', colorFilled: '#6366f1' },
    { color: 'bg-rose-200', colorFilled: '#f43f5e' },
    { color: 'bg-amber-200', colorFilled: '#f59e0b' },
  ])

  const addNewHabit = () => {
    const colorIndex = habitList.length % defaultColors.length
    const { color, colorFilled } = defaultColors[colorIndex]

    // Create a new habit with default names based on the days of the month
    const newHabit: IHabit = {
      color,
      colorFilled,
      name: `Day ${currentMonth.daysInMonth() + 1}`, // Adjust the naming pattern as needed
      id: uuidv4(),
    }

    // Update habit list in state
    setHabitList((prevHabits) => {
      const updatedHabitList = [...prevHabits, newHabit]

      // Update localStorage with the updated habit list
      localStorage.setItem('habitData', JSON.stringify(updatedHabitList))

      return updatedHabitList
    })
  }

  const addRecordForSelectedDay = (habitId: string, date: string) => {
    const existingRecordIndex = recordData.findIndex(
      (record) => record.habitId === habitId && record.date === date
    )

    if (existingRecordIndex !== -1) {
      const updatedRecordData = [...recordData]
      updatedRecordData[existingRecordIndex] = {
        ...updatedRecordData[existingRecordIndex],
        isDone: !updatedRecordData[existingRecordIndex].isDone,
      }

      setRecordData(updatedRecordData)
      localStorage.setItem('recordData', JSON.stringify(updatedRecordData))
    } else {
      const newRecord: IRecord = {
        id: uuidv4(),
        habitId,
        date,
        isDone: true,
      }

      setRecordData((prevRecords) => [...prevRecords, newRecord])
      localStorage.setItem(
        'recordData',
        JSON.stringify([...recordData, newRecord])
      )
    }
  }

  return (
    <main>
      <div>
        <div className={`flex flex-row-reverse m-3 mx-auto max-w-screen-xl`}>
          <div className="join flex">
            <button className="join-item btn" onClick={() => changeMonth(-1)}>
              «
            </button>
            <button className="join-item btn w">{monthYear}</button>
            <button className="join-item btn" onClick={() => changeMonth(1)}>
              »
            </button>
            <button className="join-item btn" onClick={resetToCurrentDay}>
              Today
            </button>
          </div>
        </div>
        {habitList.map((habit: IHabit) => {
          const checkedRecords = recordData.filter((record: IRecord) => {
            return (
              record.habitId === habit.id &&
              record.date.includes(currentMonth.format('YYYY-MM'))
            )
          })

          return (
            <HabitLine
              color={habit.color}
              key={habit.id}
              habit={habit}
              currentMonth={currentMonth}
              checkedRecords={checkedRecords}
              addRecordForSelectedDay={addRecordForSelectedDay}
            />
          )
        })}
      </div>
      <button onClick={addNewHabit}>Add habit</button>
    </main>
  )
}
