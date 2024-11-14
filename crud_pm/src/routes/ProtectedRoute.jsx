import { Navigate, Outlet } from 'react-router-dom'
import { useAuthUser } from '../auth/AuthProvider'

export default function ProtectedRoute() {
  const userAuth = useAuthUser()

  return <>{userAuth.isAuthenticated ? <Outlet /> : <Navigate to='/' />}</>
}
