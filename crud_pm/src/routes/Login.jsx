import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='rounded-lg w-screen h-full box-border flex justify-center'>
      <div className='w-[100vh] h-[100vh] flex items-center justify-center'>
        <section className='flex flex-col items-center justify-center px-10 py-5 rounded-lg shadow-lg border-t border-gray-100'>
          <img
            src='./public/Images/logo.png'
            alt='Logo Tech'
            width={'80px'}
            height={'80px'}
            className='rounded-full'
          />
          <div className='w-[360px] flex flex-col items-center justify-center gap-7 p-4 text-sm'>
            <h2 className='text-center mb-2 text-lg'>Inicio de sesion</h2>
            <div className='flex flex-col gap-2 w-full'>
              <span>Usuario</span>
              <input
                type='text'
                placeholder='Usuario'
                className='rounded-md border border-slate-300 p-2 w-full'
              />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <span>Contraseña</span>
              <input
                type='password'
                placeholder='Contraseña'
                className='rounded-md border border-slate-300 p-2 w-full'
              />
            </div>
            <Link
              to='/dashboard'
              className='w-full bg-slate-500 hover:bg-opacity-90 text-white p-2 rounded flex justify-center mt-5'
            >
              Ingresar
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
