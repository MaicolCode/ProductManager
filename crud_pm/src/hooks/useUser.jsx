import { useContext } from 'react'
import { userContext } from '../contexts/users'

export default function useUser() {
  const { users, deleteUser } = useContext(userContext)

  return { users, deleteUser }
}
