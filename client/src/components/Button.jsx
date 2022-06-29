import React from 'react'

const Button = ({ bgColor, color, size, text, borderRadius, customFunc }) => {
  return (
    <button type="button" onClick={customFunc} style={{ backgroundColor: bgColor, color, borderRadius}} className={`text-${size} p-3 hover:drop-shadow-xl`}>
      {text}
    </button>
  )
}

export default Button