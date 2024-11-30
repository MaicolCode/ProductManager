import { createContext, useEffect, useState } from 'react'

export const userContext = createContext()

export default function UsersProvider({ children }) {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function deleteUser(id) {
    await fetch(`http://localhost:3000/user/${id}`, {
      method: 'DELETE'
    })

    fetchUsers()
  }

  async function fetchUsers() {
    const res = await fetch('http://localhost:3000/user/all')
    const result = await res.json()
    setUsers(result)
  }

  console.log(users)

  return (
    <userContext.Provider value={{ users: users, deleteUser }}>
      {children}
    </userContext.Provider>
  )
}
