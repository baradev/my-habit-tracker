import React from 'react'

interface NoHabitsScreenProps {
  addNewHabit: () => void
}

export const NoHabitsScreen: React.FC<NoHabitsScreenProps> = ({
  addNewHabit,
}) => {
  return (
    <div className="m-3 text-center">
      <p>You do not have a habit yet, go ahead and create one</p>
      <button className={`btn btn-default`} onClick={addNewHabit}>
        Create a habit
      </button>
    </div>
  )
}
