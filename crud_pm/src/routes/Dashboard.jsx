import { useAuthUser } from '../auth/AuthProvider'
import { API_URL } from '../auth/constants'
import Products from '../pages/Products'
import Sales from '../pages/Sales'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

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
    <div className='h-dvh w-full p-5'>
      <div className='min-h-full border-2 border-black rounded-lg p-4'>
        <section className='flex justify-between items-center'>
          <Navigation />
          <button
            className='p-2 bg-blue-500 text-white rounded-lg'
            onClick={handleClick}
          >
            Logout
          </button>
        </section>

        <Routes>
          <Route path='/products' element={<Products />} />
          <Route path='/sales' element={<Sales />} />
        </Routes>

        <section>
          <Outlet />
        </section>
      </div>
    </div>
  )
}
function Navigation() {
  return (
    <>
      <nav className='flex gap-5 p-5 bg-slate-50 w-full'>
        <Link to='/dashboard/products'>Productos</Link>
        <Link to='/dashboard/sales'>Ventas</Link>
        <Link to='/dashboard/users'>Usuarios</Link>
      </nav>
    </>
  )
}
