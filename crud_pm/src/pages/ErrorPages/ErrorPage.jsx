import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className='w-screen h-full flex flex-col justify-center items-center gap-5 text-slate-500'>
      <img
        src='../public/Images/logo.png'
        alt='Error'
        className='w-[150px] border rounded-full shadow-lg'
      />
      <h1 className='text-3xl'>Error 404</h1>

      <p>
        La página a la que intentaste acceder no existe por favor redirigete a{' '}
        <Link to='/' className='text-sky-800 underline'>
          Login
        </Link>
      </p>
    </div>
  )
}
