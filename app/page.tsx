// Import necessary libraries and components
'use client'
import React, { useState, useEffect } from 'react'
import HabitLine from './HabitLine'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

// Define interfaces for habit and record
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

// Interface for the record data
interface IRecordData {
  Records: IRecord[]
}

// Home component
export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(dayjs())

  useEffect(() => {
    const savedMonth = localStorage.getItem('currentMonth')
    const initialMonth = savedMonth ? dayjs(savedMonth) : dayjs()
    setCurrentMonth(initialMonth)
  }, [])

  useEffect(() => {
    // Use the current month as part of the localStorage keys
    const habitLocalStorageKey = `habitData_${currentMonth.format('YYYY-MM')}`
    const savedHabits = localStorage.getItem(habitLocalStorageKey)
    const initialHabits = savedHabits ? JSON.parse(savedHabits) : []
    setHabitList(initialHabits)
  }, [currentMonth])

  // ...

  useEffect(() => {
    // Use the current month as part of the localStorage keys
    const recordLocalStorageKey = `recordData_${currentMonth.format('YYYY-MM')}`

    const savedRecords = localStorage.getItem(recordLocalStorageKey)
    const initialRecords = savedRecords ? JSON.parse(savedRecords) : []
    setRecordData(initialRecords)
  }, [currentMonth])

  // ...

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

    const newHabit: IHabit = {
      color,
      colorFilled,
      name: '', // You may want to change this to the desired default name
      id: uuidv4(),
    }

    setHabitList((prevHabits) => {
      const updatedHabitList = [...prevHabits, newHabit]

      // Use the current month as part of the localStorage keys
      const habitLocalStorageKey = `habitData_${currentMonth.format('YYYY-MM')}`

      localStorage.setItem(
        habitLocalStorageKey,
        JSON.stringify(updatedHabitList)
      )

      return updatedHabitList
    })
  }

  useEffect(() => {
    // Use the current month as part of the localStorage keys
    const habitLocalStorageKey = `habitData_${currentMonth.format('YYYY-MM')}`

    const savedHabits = localStorage.getItem(habitLocalStorageKey)
    const initialHabits = savedHabits
      ? JSON.parse(savedHabits)
      : [
          {
            color: 'bg-green-200',
            colorFilled: '#84CC16',
            name: '',
            id: uuidv4(),
          },
        ]

    setHabitList(initialHabits)
  }, [currentMonth])

  const deleteHabit = (habitId: string) => {
    const updatedHabitList = habitList.filter((habit) => habit.id !== habitId)
    setHabitList(updatedHabitList)

    // Use the current month as part of the localStorage keys
    const habitLocalStorageKey = `habitData_${currentMonth.format('YYYY-MM')}`
    localStorage.setItem(habitLocalStorageKey, JSON.stringify(updatedHabitList))

    const updatedRecordData = recordData.filter(
      (record) => record.habitId !== habitId
    )
    setRecordData(updatedRecordData)

    // Use the current month as part of the localStorage keys
    const recordLocalStorageKey = `recordData_${currentMonth.format('YYYY-MM')}`
    localStorage.setItem(
      recordLocalStorageKey,
      JSON.stringify(updatedRecordData)
    )
  }
  const addRecordForSelectedDay = (habitId: string, date: string) => {
    // Use the current month as part of the localStorage keys
    const recordLocalStorageKey = `recordData_${currentMonth.format('YYYY-MM')}`

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
      localStorage.setItem(
        recordLocalStorageKey,
        JSON.stringify(updatedRecordData)
      )
    } else {
      const newRecord: IRecord = {
        id: uuidv4(),
        habitId,
        date,
        isDone: true,
      }

      const updatedRecordData = [...recordData, newRecord]

      setRecordData(updatedRecordData)
      localStorage.setItem(
        recordLocalStorageKey,
        JSON.stringify(updatedRecordData)
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
              onDeleteHabit={() => deleteHabit(habit.id)}
            />
          )
        })}
      </div>
      <button onClick={addNewHabit}>Add habit</button>
    </main>
  )
}
