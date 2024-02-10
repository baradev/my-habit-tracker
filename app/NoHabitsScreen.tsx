import React from 'react'

interface NoHabitsScreenProps {
  addNewHabit: () => void
}

export const NoHabitsScreen: React.FC<NoHabitsScreenProps> = ({
  addNewHabit,
}) => {
  return (
    <div className="m-3 text-center">
      <div className="flex justify-center mb-10 mt-10 font-medium text-lg">
        <p>You do not have a habit yet, go ahead and create one</p>
      </div>
      <button className={`btn btn-active btn-secondary`} onClick={addNewHabit}>
        Create a habit
      </button>
    </div>
  )
}
