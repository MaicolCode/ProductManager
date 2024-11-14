import { Router } from 'express'
import { connection } from '../utils/connection.js'
import { getTokenFromHeader } from '../auth/getTokenFromHeader.js'

const signOutRouter = Router()

signOutRouter.delete('/', async (req, resp) => {
  const token = getTokenFromHeader(req.headers)
  console.log(token)

  if (token) {
    const deleted = await deleteToken(token)
    console.log(deleted)
    if (deleted) {
      resp.status(200).json({ message: 'Token deleted' })
    } else {
      resp.status(401).json({ message: 'Token not deleted' })
    }
  } else {
    resp.status(401).json({ message: 'No token provided' })
  }
})

async function deleteToken(token) {
  const [id] = await connection.query(
    'SELECT BIN_TO_UUID(id) as id FROM refresh_tokens WHERE refresh_token = ?',
    [token]
  )

  try {
    const [response] = await connection.query(
      'DELETE FROM refresh_tokens WHERE id = UUID_TO_BIN(?)',
      [id[0].id]
    )
    if (response.affectedRows > 0) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
  }
}

export default signOutRouter
