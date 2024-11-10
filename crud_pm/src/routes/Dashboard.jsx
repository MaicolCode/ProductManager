import { useAuthUser } from '../auth/AuthProvider'
import ErrorPage from '../pages/ErrorPage'
import Products from '../pages/Products'
import Sales from '../pages/Sales'
import {
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
  Navigate
} from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  return (
    <>
      <div className='border-2 border-black rounded-lg p-4 m-4'>
        <section className='flex justify-between items-center'>
          <Navigation />
          <button
            className='p-2 bg-blue-500 text-white rounded-lg'
            onClick={() => navigate('/')}
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
    </>
  )
}
function Navigation() {
  const userAuth = useAuthUser()

  return (
    <>
      <nav className='flex gap-5 p-5 bg-slate-50 w-full'>
        <Link to='/dashboard/products'>Productos</Link>
        <Link to='/dashboard/sales'>Ventas</Link>
        {userAuth.type === 'admin' ? (
          <Link to='/dashboard/users'>Usuarios</Link>
        ) : (
          <Navigate to='/dashboard' />
        )}
      </nav>
    </>
  )
}
