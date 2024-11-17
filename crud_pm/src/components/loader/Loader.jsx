import Loading from '../../icons/Loading'

export default function Loader() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-5 bg-zinc-300 bg-opacity-10'>
      <Loading />
      Por favor espere mientras se carga el contenido...
    </div>
  )
}
