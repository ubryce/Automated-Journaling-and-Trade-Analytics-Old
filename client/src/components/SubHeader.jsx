import React from 'react'

const SubHeader = ({ name, description }) => {
  return (
    <div className=" mb-10">
        <p className="text-lg font-extrabold tracking-tight text-slate-900">{name}</p>
        <p className="text-md text-gray-400">
            {description}
        </p>
  </div>
  )
}

export default SubHeader