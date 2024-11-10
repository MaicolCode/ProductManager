import { useContext, createContext, useState, useEffect } from 'react'

const AuthUserContext = createContext({
  isAuthenticated: false,
  type: 'user'
})

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  return (
    <AuthUserContext.Provider value={isAuthenticated}>
      {children}
    </AuthUserContext.Provider>
  )
}

export function useAuthUser() {
  return useContext(AuthUserContext)
}
