import React from 'react'

interface RecordProps {
  day: number
  isSelected: boolean
  colorFilled: string
  onSquareClick: () => void
}

const Record: React.FC<RecordProps> = ({
  day,
  isSelected,
  onSquareClick,
  colorFilled,
}) => {
  const squareStyle = {
    backgroundColor: isSelected ? colorFilled : 'white',
  }

  const handleClick = () => {
    onSquareClick() // Call the provided onSquareClick function
  }

  return (
    <div
      onClick={handleClick} // Use handleClick instead of onSquareClick directly
      style={squareStyle}
      className="flex items-center justify-center w-6 h-6 m-2 cursor-pointer"
    >
      <span className={isSelected ? 'text-white' : 'text-gray-400'}>{day}</span>
    </div>
  )
}

export default Record
