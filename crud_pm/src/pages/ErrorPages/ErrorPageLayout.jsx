export default function ErrorPageDashboard() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-5 text-slate-400'>
      <img
        src='../public/Images/logo.png'
        alt='Error'
        className='w-[150px] border rounded-full shadow-lg'
      />
      <h1 className='text-xl'>Error al cargar la página...</h1>

      <p>
        La página a la que intentaste acceder no contiene datos o no existe.
      </p>
    </div>
  )
}
