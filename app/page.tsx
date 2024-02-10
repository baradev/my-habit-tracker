'use client'
import React, { useState, useEffect } from 'react'
import HabitLine from './HabitLine'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { NoHabitsScreen } from './NoHabitsScreen'

export interface IHabit {
  color: string
  colorFilled: string
  name: string
  id: string
  isEditMode?: boolean
  isNew?: boolean
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
  const [habitList, setHabitList] = useState<IHabit[]>([])
  const [habitInEditMode, setHabitInEditMode] = useState<string | null>(null)

  useEffect(() => {
    const savedMonth = localStorage.getItem('currentMonth')
    const initialMonth = savedMonth ? dayjs(savedMonth) : dayjs()
    setCurrentMonth(initialMonth)
  }, [])

  useEffect(() => {
    const habitLocalStorageKey = `habitData_${currentMonth.format('YYYY-MM')}`
    const savedHabits = localStorage.getItem(habitLocalStorageKey)
    const initialHabits = savedHabits ? JSON.parse(savedHabits) : []
    setHabitList(
      initialHabits.map((habit: IHabit) => ({
        ...habit,
        isNew: false,
        isEditMode: false,
      }))
    )
  }, [currentMonth])

  useEffect(() => {
    const recordLocalStorageKey = `recordData_${currentMonth.format('YYYY-MM')}`
    const savedRecords = localStorage.getItem(recordLocalStorageKey)
    const initialRecords = savedRecords ? JSON.parse(savedRecords) : []
    setRecordData(initialRecords)
  }, [currentMonth])

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

  const [defaultColors, setDefaultColors] = useState([
    { color: 'bg-green-200', colorFilled: '#84CC16' },
    { color: 'bg-indigo-200', colorFilled: '#6366f1' },
    { color: 'bg-rose-200', colorFilled: '#f43f5e' },
    { color: 'bg-amber-200', colorFilled: '#f59e0b' },
  ])

  const addNewHabit = () => {
    const colorIndex = habitList.length % defaultColors.length
    const { color, colorFilled } = defaultColors[colorIndex]
    const newHabitId = uuidv4()

    // Update the habit list for every future month

    const savedMonths: string[] = JSON.parse(
      localStorage.getItem('savedMonths') || '[]'
    )
    const updatedMonths = new Set(savedMonths)
    const futureMonths = [] // Keep track of future months for which habits are added
    for (let i = 0; i <= 12; i++) {
      // Adding habits for next 12 months, you can adjust this as needed
      const monthToAddHabit = currentMonth.clone().add(i, 'month')
      const habitLocalStorageKey = `habitData_${monthToAddHabit.format(
        'YYYY-MM'
      )}`
      const savedHabits = localStorage.getItem(habitLocalStorageKey)
      const initialHabits = savedHabits ? JSON.parse(savedHabits) : []
      const updatedHabits = [
        ...initialHabits,
        {
          color,
          colorFilled,
          name: '',
          id: newHabitId,
          isNew: true,
          isEditMode: true,
        },
      ]
      localStorage.setItem(habitLocalStorageKey, JSON.stringify(updatedHabits))
      futureMonths.push(monthToAddHabit.format('YYYY-MM'))
    }
    // Update the saved months set
    futureMonths.forEach((month) => updatedMonths.add(month))
    localStorage.setItem(
      'savedMonths',
      JSON.stringify(Array.from(updatedMonths))
    )

    // Update the habit list state for the current month
    setHabitList((prevHabits) => [
      ...prevHabits,
      {
        color,
        colorFilled,
        name: '',
        id: newHabitId,
        isNew: true,
        isEditMode: true,
      },
    ])

    // Set the habit in edit mode
    setHabitInEditMode(newHabitId)
  }

  const deleteHabit = (habitId: string) => {
    const savedMonths: string[] = JSON.parse(
      localStorage.getItem('savedMonths') || '[]'
    )

    // Remove the habit from the habit list of the current month
    setHabitList((prevHabits) =>
      prevHabits.filter((habit) => habit.id !== habitId)
    )

    // Remove the habit from the habit lists of all future months
    const currentMonthIndex = savedMonths.indexOf(
      currentMonth.format('YYYY-MM')
    )
    if (currentMonthIndex !== -1) {
      const futureMonths = savedMonths.slice(currentMonthIndex)
      futureMonths.forEach((month: string) => {
        const habitLocalStorageKey = `habitData_${month}`
        const savedHabits = localStorage.getItem(habitLocalStorageKey)
        if (savedHabits) {
          const updatedHabits = JSON.parse(savedHabits).filter(
            (habit: IHabit) => habit.id !== habitId
          )
          localStorage.setItem(
            habitLocalStorageKey,
            JSON.stringify(updatedHabits)
          )
        }
      })
    }

    // Refresh habit list for the current month
    const habitLocalStorageKey = `habitData_${currentMonth.format('YYYY-MM')}`
    const savedHabits = localStorage.getItem(habitLocalStorageKey)
    const initialHabits = savedHabits ? JSON.parse(savedHabits) : []
    setHabitList(
      initialHabits.map((habit: IHabit) => ({
        ...habit,
        isNew: false,
        isEditMode: false,
      }))
    )
  }

  const addRecordForSelectedDay = (habitId: string, date: string) => {
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

  const hasNoHabits = () => {
    return habitList.length === 0
  }

  return (
    <main>
      <div>
        <div className={`flex flex-row-reverse m-3 mx-auto max-w-screen-xl`}>
          <div className="join flex">
            <button className="join-item btn" onClick={() => changeMonth(-1)}>
              «
            </button>
            <button className="join-item btn w-40">{monthYear}</button>
            <button className="join-item btn" onClick={() => changeMonth(1)}>
              »
            </button>
            <button className="join-item btn" onClick={resetToCurrentDay}>
              Today
            </button>
          </div>
        </div>
        {!currentMonth.isBefore(dayjs(), 'month') && hasNoHabits() && (
          <NoHabitsScreen addNewHabit={addNewHabit} />
        )}
        {habitList.length > 0 && (
          <>
            {habitList.map((habit: IHabit) => {
              const checkedRecords = recordData.filter((record: IRecord) => {
                return (
                  record.habitId === habit.id &&
                  record.date.includes(currentMonth.format('YYYY-MM'))
                )
              })
              return (
                <HabitLine
                  key={habit.id}
                  habit={habit}
                  currentMonth={currentMonth}
                  checkedRecords={checkedRecords}
                  addRecordForSelectedDay={addRecordForSelectedDay}
                  onDeleteHabit={() => deleteHabit(habit.id)}
                  defaultColors={defaultColors}
                  habitList={habitList}
                />
              )
            })}
          </>
        )}
        <div className={`flex m-3 mx-auto max-w-screen-xl`}>
          {habitList.length < 4 && !hasNoHabits() && (
            <button className="btn btn-default" onClick={addNewHabit}>
              +
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
