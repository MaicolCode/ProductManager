import { useState } from 'react'
import { useAuthUser } from '../auth/AuthProvider'
import { API_URL } from '../auth/constants'
import Products from '../pages/Products'
import Sales from '../pages/Sales'
import {
  Routes,
  Route,
  Outlet,
  NavLink,
  useNavigate,
  Navigate
} from 'react-router-dom'
import MenuIcon from '../icons/Menu'
import CloseIcon from '../icons/close'
import ProductProvider from '../contexts/product'
import SalesProvider from '../contexts/sales'
import ErrorPageLayout from '../pages/ErrorPages/ErrorPageLayout'
import ArrowIcon from '../icons/Arrow'
import OffIcon from '../icons/Off'
import Dashboard from '../pages/Dashboard'
import Users from '../pages/Users'
import UsersProvider from '../contexts/users'
import CategoryProvider from '../contexts/category'

export default function Layout() {
  const { getRefreshToken, signOut } = useAuthUser()
  const { getUser } = useAuthUser()
  const user = getUser()

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
    <div className='h-full w-full p-3'>
      <div className='relative h-full shadow-[0_0_10px_1px_rgba(0,0,0,0.1)] rounded-lg p-4 flex  sm:flex-row sm:gap-5 z-0'>
        <section className='w-[auto] sm:w-[200px] h-full flex flex-col justify-between items-center'>
          <Navigation action={handleClick} />
        </section>
        <section className='absolute w-[10px] h-full top-1 start-1 flex flex-col sm:hidden z-10'>
          <Hamburger action={handleClick} />
        </section>

        <SalesProvider>
          <ProductProvider>
            <Routes>
              <Route index={true} element={<Dashboard />} />
              <Route path='/inicio' element={<Dashboard />} />
              <Route
                path='/products'
                element={
                  <CategoryProvider>
                    <Products />
                  </CategoryProvider>
                }
              />
              <Route path='/sales' element={<Sales />} />
              {user.type === 'admin' && (
                <Route
                  path='/users'
                  element={
                    <UsersProvider>
                      <Users />
                    </UsersProvider>
                  }
                />
              )}
              <Route path='*' element={<ErrorPageLayout />} />
            </Routes>
          </ProductProvider>
        </SalesProvider>
        <Outlet />
      </div>
    </div>
  )
}

function Navigation({ action }) {
  const { getUser } = useAuthUser()
  const user = getUser()
  console.log(user)
  return (
    <>
      <nav className='h-screen w-[200px] hidden sm:flex flex-col justify-between  gap-5 py-3 px-2 bg-slate-100 rounded-tl-md rounded-bl-lg text-sm'>
        <section className='flex flex-col gap-2'>
          <article className='relative w-[200px] h-[90px] flex  items-center  gap-2 my-6'>
            <img
              src='../public/images/logo.png'
              alt='logo'
              className='w-16 h-16 rounded-full'
            />
            <div className='flex flex-col gap-0'>
              <span className='absolute end-5 top-0 text-xs text-center text-white bg-red-300 rounded-lg p-1 w-auto'>
                {user.type}
              </span>
              <span className='text-xs text-slate-400'>{user.name}</span>
              <span>{user.username}</span>
            </div>
          </article>

          <NavLink
            to={`/dashboard/inicio`}
            className={({ isActive }) =>
              isActive
                ? 'p-3 bg-gray-300 text-slate-500 bg-opacity-40 rounded-md flex items-center gap-2'
                : 'p-3 bg-gray-200 text-slate-500 bg-opacity-40 rounded-md flex items-center gap-2'
            }
          >
            <ArrowIcon />
            Inicio
          </NavLink>
          <NavLink
            to={`/dashboard/products`}
            className={({ isActive }) =>
              isActive
                ? 'p-3 bg-gray-300 text-slate-500 bg-opacity-40 rounded-md flex items-center gap-2'
                : 'p-3 bg-gray-200 text-slate-500 bg-opacity-40 rounded-md flex items-center gap-2'
            }
          >
            <ArrowIcon />
            Productos
          </NavLink>

          <NavLink
            to={`/dashboard/sales`}
            className={({ isActive }) =>
              isActive
                ? 'p-3 bg-gray-300 text-slate-500 bg-opacity-40 rounded-md flex items-center gap-2'
                : 'p-3 bg-gray-200 text-slate-500 bg-opacity-40 rounded-md flex items-center gap-2'
            }
          >
            <ArrowIcon />
            Ventas
          </NavLink>
          {user.type === 'admin' && (
            <NavLink
              to={`/dashboard/users`}
              className={({ isActive }) =>
                isActive
                  ? 'p-3 bg-gray-300 text-slate-500 bg-opacity-40 rounded-md flex items-center gap-2'
                  : 'p-3 bg-gray-200 text-slate-500 bg-opacity-40 rounded-md flex items-center gap-2'
              }
            >
              <ArrowIcon />
              Usuarios
            </NavLink>
          )}
        </section>
        <button
          className='p-3 bg-gray-200 rounded-lg text-slate-500 flex justify-center items-center gap-2'
          onClick={action}
        >
          <OffIcon /> Cerrar sesion
        </button>
      </nav>
    </>
  )
}

function Hamburger({ action }) {
  const [visible, setVisible] = useState(false)
  const { getUser } = useAuthUser()
  const user = getUser()

  const handleClick = () => {
    setVisible(!visible)
  }

  return (
    <div className='h-[99%] flex flex-col gap-1 '>
      <div className='w-full'>
        <button
          className='h-10 w-10 p-3 sm:hidden bg-slate-100 rounded-lg text-slate-500 flex justify-center items-center'
          onClick={handleClick}
        >
          {!visible ? <MenuIcon /> : <CloseIcon />}
        </button>
      </div>
      {visible && (
        <nav className='h-full w-[200px] flex sm:hidden flex-col justify-between  gap-5 py-3 px-2 bg-slate-100 rounded-md text-sm'>
          <section className='flex flex-col gap-2'>
            <article className='relative w-[200px] h-[90px] flex  items-center  gap-2 my-6'>
              <img
                src='../public/images/logo.png'
                alt='logo'
                className='w-16 h-16 rounded-full'
              />
              <div className='flex flex-col gap-0'>
                <span className='absolute end-5 top-0 text-xs text-center text-white bg-red-300 rounded-lg p-1 w-auto'>
                  {user.type}
                </span>
                <span className='text-xs text-slate-400'>{user.name}</span>
                <span>{user.username}</span>
              </div>
            </article>

            <NavLink
              to={`/dashboard/inicio`}
              className={({ isActive }) =>
                isActive
                  ? 'p-3 bg-gray-300 text-slate-500 bg-opacity-40 rounded-md flex items-center gap-2'
                  : 'p-3 bg-gray-200 text-slate-500 bg-opacity-40 rounded-md flex items-center gap-2'
              }
            >
              <ArrowIcon />
              Inicio
            </NavLink>
            <NavLink
              to={`/dashboard/products`}
              className={({ isActive }) =>
                isActive
                  ? 'p-3 bg-gray-300 text-slate-500 bg-opacity-40 rounded-md flex items-center gap-2'
                  : 'p-3 bg-gray-200 text-slate-500 bg-opacity-40 rounded-md flex items-center gap-2'
              }
            >
              <ArrowIcon />
              Productos
            </NavLink>

            <NavLink
              to={`/dashboard/sales`}
              className={({ isActive }) =>
                isActive
                  ? 'p-3 bg-gray-300 text-slate-500 bg-opacity-40 rounded-md flex items-center gap-2'
                  : 'p-3 bg-gray-200 text-slate-500 bg-opacity-40 rounded-md flex items-center gap-2'
              }
            >
              <ArrowIcon />
              Ventas
            </NavLink>
            <NavLink
              to={`/dashboard/users`}
              className={({ isActive }) =>
                isActive
                  ? 'p-3 bg-gray-300 text-slate-500 bg-opacity-40 rounded-md flex items-center gap-2'
                  : 'p-3 bg-gray-200 text-slate-500 bg-opacity-40 rounded-md flex items-center gap-2'
              }
            >
              <ArrowIcon />
              Usuarios
            </NavLink>
          </section>
          <button
            className='p-3 bg-gray-200 rounded-lg text-slate-500 flex justify-center items-center gap-2'
            onClick={action}
          >
            <OffIcon /> Cerrar sesion
          </button>
        </nav>
      )}
    </div>
  )
}
