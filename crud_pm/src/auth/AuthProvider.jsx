import { useContext, createContext, useState, useEffect } from 'react'
import { API_URL } from './constants'
import Loader from '../components/loader/Loader'

const AuthUserContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: (userData) => {},
  getRefreshToken: () => {},
  getUser: () => {},
  signOut: () => {}
})

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessToken, setAccessToken] = useState(null)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  async function requestAccessToken(refreshToken) {
    try {
      const response = await fetch(`${API_URL}/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`
        }
      })

      if (response.ok) {
        const json = await response.json()
        if (json.error) {
          throw new Error(json.error)
        }
        return json.accessToken
      } else {
        throw new Error(response.statusText)
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async function getUserData(accessToken) {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (response.ok) {
        const json = await response.json()
        if (json.error) {
          throw new Error(json.error)
        }
        return json
      } else {
        throw new Error(response.statusText)
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async function checkAuth() {
    if (accessToken) {
      // Usuario autenticado
    } else {
      const token = getRefreshToken()
      if (token) {
        const newAccessToken = await requestAccessToken(token)

        if (newAccessToken) {
          const userData = await getUserData(newAccessToken)

          if (userData) {
            saveUserSession(newAccessToken, userData, token)
            setIsLoading(false)
            return
          }
        }
      }
    }
    setIsLoading(false)
  }

  function saveUserSession(accessToken, user, refreshToken) {
    setAccessToken(accessToken)
    setUser(user.user)

    localStorage.setItem('token', JSON.stringify(refreshToken))
    setIsAuthenticated(true)
  }

  //Obtener el token de acceso
  function getAccessToken() {
    return accessToken
  }

  function getRefreshToken() {
    const token = localStorage.getItem('token')
    if (token) {
      const refreshToken = JSON.parse(token)
      return refreshToken
    }

    return null
  }

  function saveUser(userData) {
    saveUserSession(userData.accessToken, userData.user, userData.refreshToken)
  }

  function signOut() {
    setIsAuthenticated(false)
    setUser(null)
    setAccessToken(null)
    localStorage.removeItem('token')
  }

  function getUser() {
    return user
  }

  return (
    <AuthUserContext.Provider
      value={{
        isAuthenticated,
        getAccessToken,
        saveUser,
        getRefreshToken,
        getUser,
        signOut
      }}
    >
      {isLoading ? <Loader /> : children}
    </AuthUserContext.Provider>
  )
}

export function useAuthUser() {
  return useContext(AuthUserContext)
}
