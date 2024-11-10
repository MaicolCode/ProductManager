import { createRoot } from 'react-dom/client'
import Dashboard from './routes/Dashboard.jsx'
import './styles.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'
import Login from './routes/Login.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import AuthProvider from './auth/AuthProvider.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Login />} errorElement={<ErrorPage />}></Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard/*' element={<Dashboard />} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </>
)
