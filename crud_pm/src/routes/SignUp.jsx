import { useState } from 'react'
import { API_URL } from '../auth/constants'
import ErrorMessage from '../components/messages/ErrorMessage'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: e.target.name.value,
          username: e.target.username.value,
          password: e.target.password.value
        })
      })

      if (response.ok) {
        console.log('Usuario registrado correctamente')
        setErrorMessage(null)
        navigate('/')
      } else {
        const error = await response.json()
        setErrorMessage(error.message)
        return
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='w-screen h-full flex justify-center items-center'>
      <div className='w-[100vh] h-[100vh] flex items-center justify-center'>
        <section className='flex flex-col items-center justify-center px-10 py-5 shadow-xl rounded-lg'>
          <img
            src='./public/Images/logo.png'
            alt='Logo Tech'
            width={'80px'}
            height={'80px'}
            className='rounded-full'
          />
          <h2 className='text-center mb-4 text-lg'>Registrar nuevo usuario</h2>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <form
            className='flex flex-col gap-3 w-[360px] p-4 text-sm'
            onSubmit={handleSubmit}
          >
            <label htmlFor='name'>Nombres</label>
            <input
              type='text'
              id='name'
              name='name'
              className='rounded-md border border-slate-200 p-2 w-full'
              placeholder='Nombre de usuario'
            />
            <label htmlFor='username' className='mt-1'>
              Usuario
            </label>
            <input
              type='text'
              id='username'
              name='username'
              className='rounded-md border border-slate-200 p-2 w-full'
              placeholder='Usuario'
            />
            <label htmlFor='password' className='mt-1'>
              Contraseña
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='rounded-md border border-slate-200 p-2 w-full'
              placeholder='Contraseña'
            />
            <button
              type='submit'
              className='w-full bg-slate-500 hover:bg-opacity-90 text-white p-2 rounded flex justify-center mt-5'
            >
              Registrar
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
