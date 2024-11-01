export default function Button({ action, title, color }) {
  return (
    <button onClick={action} className={`bg-${color}-500`}>
      {title}
    </button>
  )
}
