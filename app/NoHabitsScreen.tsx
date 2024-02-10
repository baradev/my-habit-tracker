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
        <p>You are not tracking any habits yet. Go ahead and create one.</p>
      </div>
      <button className={`btn btn-active btn-secondary`} onClick={addNewHabit}>
        Create a habit bla bla
      </button>
    </div>
  )
}
