export default function Button({ action, title, color }) {
  return (
    <button
      onClick={action}
      className={`hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow bg-${color}-500`}
    >
      {title}
    </button>
  )
}
