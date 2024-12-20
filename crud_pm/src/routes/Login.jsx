import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { API_URL } from '../auth/constants'
import ErrorMessage from '../components/messages/ErrorMessage'
import { useAuthUser } from '../auth/AuthProvider'

export default function Login() {
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  const { saveUser, isAuthenticated } = useAuthUser()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value
        })
      })

      if (response.ok) {
        console.log('Usuario logeado correctamente')
        setErrorMessage(null)
        const userData = await response.json()
        if (userData.accessToken && userData.refreshToken) {
          saveUser(userData)
          navigate('/dashboard')
        }
      } else {
        const error = await response.json()
        setErrorMessage(error.message)
        return
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />
  }

  return (
    <div className='rounded-lg w-full h-full'>
      <div className='w-full h-full flex items-center justify-center'>
        <section className='flex flex-col items-center justify-center px-10 py-5 rounded-lg shadow-xl'>
          <img
            src='./public/Images/logo.png'
            alt='Logo Tech'
            width={'80px'}
            height={'80px'}
            className='rounded-full'
          />
          <h2 className='text-center mb-2 text-md sm:text-lg'>
            Inicio de sesion
          </h2>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <form
            className='w-[250px] sm:w-[360px] flex flex-col justify-center gap-3 sm:p-4 text-xs sm:text-sm'
            onSubmit={handleSubmit}
          >
            <label htmlFor='username'>Usuario</label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Usuario'
              className='rounded-md border border-slate-200 p-2 w-full'
            />
            <label htmlFor='password' className='mt-1'>
              Contraseña
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Contraseña'
              className='rounded-md border border-slate-200 p-2 w-full'
            />
            <div className='flex justify-center w-full text-sky-800'>
              <Link to='/signup'>¿No tienes cuenta? Registrate</Link>
            </div>
            <button
              type='submit'
              className='w-full bg-slate-500 hover:bg-opacity-90 text-white p-2 rounded flex justify-center mt-5'
            >
              Ingresar
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
