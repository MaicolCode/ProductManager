import { useState } from 'react'

export default function Button({ onDelete, identifier, title, color }) {
  return (
    <button
      onClick={() => onDelete(identifier)}
      className={`hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow bg-${color}-500`}
    >
      {title}
    </button>
  )
}
