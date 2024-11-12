export default function ErrorMessage({ message }) {
  return (
    <div className='bg-red-500 text-white px-2 py-3 rounded-lg w-[340px] my-5 text-sm'>
      <p>{message}</p>
    </div>
  )
}
