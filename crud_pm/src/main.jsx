import { createRoot } from 'react-dom/client'
import Layout from './routes/Layout.jsx'
import './styles.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'
import Login from './routes/Login.jsx'
import ErrorPage from './pages/ErrorPages/ErrorPage.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import AuthProvider from './auth/AuthProvider.jsx'
import SignUp from './routes/SignUp.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Login />} errorElement={<ErrorPage />}></Route>
      <Route
        path='/signup'
        element={<SignUp />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard/*' element={<Layout />} />
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
