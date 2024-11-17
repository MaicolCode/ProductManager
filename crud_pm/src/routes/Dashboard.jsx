import { useState } from 'react'
import { useAuthUser } from '../auth/AuthProvider'
import { API_URL } from '../auth/constants'
import Products from '../pages/Products'
import Sales from '../pages/Sales'
import {
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
  NavLink
} from 'react-router-dom'
import MenuIcon from '../icons/Menu'
import CloseIcon from '../icons/close'

export default function Dashboard() {
  const navigate = useNavigate()
  const { getRefreshToken, signOut } = useAuthUser()

  async function handleClick() {
    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getRefreshToken()}`
        }
      })

      if (response.ok) {
        signOut()
      } else {
        const error = await response.json()
        console.log(error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='h-dvh w-full p-3'>
      <div className='h-full shadow-[0_0_10px_1px_rgba(0,0,0,0.1)] rounded-lg p-4 flex gap-5'>
        <section className='lg:w-[200px] sm:w-[360px] flex flex-col justify-between items-center'>
          <Navigation action={handleClick} />
          <section className='relative h-full flex sm:hidden gap-2'>
            <Hamburger action={handleClick} />
          </section>
        </section>

        <Routes>
          <Route path='/products' element={<Products />} />
          <Route path='/sales' element={<Sales />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  )
}

function Navigation({ action }) {
  return (
    <>
      <nav className='h-full w-[200px] hidden sm:flex flex-col justify-between  gap-5 py-3 px-2 bg-slate-100 rounded-tl-md rounded-bl-lg text-sm'>
        <section className='flex flex-col gap-2'>
          <article className='relative w-[200px] h-[90px] flex justify-center items-center'>
            <img
              src='../public/images/logo.png'
              alt='logo'
              className='w-16 h-16 rounded-full'
            />
          </article>

          <NavLink
            to={`/dashboard/products`}
            className={({ isActive }) =>
              isActive
                ? 'p-3 bg-gray-300 text-slate-500 bg-opacity-40 rounded-md'
                : 'p-3 bg-gray-200 text-slate-500 bg-opacity-40 rounded-md'
            }
          >
            Productos
          </NavLink>

          <NavLink
            to={`/dashboard/sales`}
            className={({ isActive }) =>
              isActive
                ? 'p-3 bg-gray-300 text-slate-500 bg-opacity-40 rounded-md'
                : 'p-3 bg-gray-200 text-slate-500 bg-opacity-40 rounded-md'
            }
          >
            Ventas
          </NavLink>
          <NavLink
            to={`/dashboard/users`}
            className={({ isActive }) =>
              isActive
                ? 'p-3 bg-gray-300 text-slate-500 bg-opacity-40 rounded-md'
                : 'p-3 bg-gray-200 text-slate-500 bg-opacity-40 rounded-md'
            }
          >
            Ventas
          </NavLink>
        </section>
        <button
          className='p-3 bg-gray-200 rounded-lg text-slate-500'
          onClick={action}
        >
          Cerrar sesion
        </button>
      </nav>
    </>
  )
}

function Hamburger({ action }) {
  const [visible, setVisible] = useState(false)

  const handleClick = () => {
    setVisible(!visible)
  }

  return (
    <div className='absolute h-full flex flex-col gap-1 z-10 top-0'>
      <button
        className='h-10 w-10 p-3 sm:hidden bg-slate-100 rounded-lg text-slate-500 flex justify-center items-center'
        onClick={handleClick}
      >
        {!visible ? <MenuIcon /> : <CloseIcon />}
      </button>
      {visible && (
        <nav className='h-full w-[200px] flex sm:hidden flex-col justify-between  gap-5 py-3 px-2 bg-slate-100 rounded-md text-sm'>
          <section className='flex flex-col gap-2'>
            <article className='relative w-[200px] h-[90px] flex justify-center items-center'>
              <img
                src='../public/images/logo.png'
                alt='logo'
                className='w-16 h-16 rounded-full'
              />
            </article>

            <NavLink
              to={`/dashboard/products`}
              className={({ isActive }) =>
                isActive
                  ? 'p-3 bg-gray-300 text-slate-500 bg-opacity-40 rounded-md'
                  : 'p-3 bg-gray-200 text-slate-500 bg-opacity-40 rounded-md'
              }
            >
              Productos
            </NavLink>

            <NavLink
              to={`/dashboard/sales`}
              className={({ isActive }) =>
                isActive
                  ? 'p-3 bg-gray-300 text-slate-500 bg-opacity-40 rounded-md'
                  : 'p-3 bg-gray-200 text-slate-500 bg-opacity-40 rounded-md'
              }
            >
              Ventas
            </NavLink>
            <NavLink
              to={`/dashboard/users`}
              className={({ isActive }) =>
                isActive
                  ? 'p-3 bg-gray-300 text-slate-500 bg-opacity-40 rounded-md'
                  : 'p-3 bg-gray-200 text-slate-500 bg-opacity-40 rounded-md'
              }
            >
              Ventas
            </NavLink>
          </section>
          <button
            className='p-3 bg-gray-200 rounded-lg text-slate-500'
            onClick={action}
          >
            Cerrar sesion
          </button>
        </nav>
      )}
    </div>
  )
}
