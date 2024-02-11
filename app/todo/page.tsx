import React from 'react'

const ToDo = () => {
  return (
    <div className="flex flex-col items-center sm:m-10 md:m-20 lg:m-40 font-medium">
      <div>
        <p>The app is still evolving, here is what is coming soon:</p>
      </div>
      <div className="m-5 sm:m-10 md:m-10 lg:m-10">
        <ul className="list-disc">
          <li>Connecting App to Database</li>
        </ul>
      </div>
    </div>
  )
}

export default ToDo
