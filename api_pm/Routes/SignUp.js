import { Router } from 'express'
import bcrypt from 'bcrypt'
import { connection } from '../utils/connection.js'

const signUpRouter = Router()

signUpRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body

  if (!name || !username || !password) {
    return res.status(400).json({ message: 'Missing parameters' })
  }

  const newPassword = await generateSecurePassword(password)

  const existsUser = await connection.query(
    'SELECT * FROM users WHERE username = ?',
    [username]
  )

  if (existsUser[0].length < 0) {
    return res.status(400).json({ message: 'Username already exists' })
  }

  try {
    await connection.query(
      'INSERT INTO users (id, name, username, password) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?)',
      [name, username, newPassword]
    )
    return res.status(200).json({ message: 'Sign up successful' })
  } catch (error) {
    console.error(error)
  }
})

// eslint-disable-next-line space-before-function-paren
async function generateSecurePassword(password) {
  const newPassword = await bcrypt.hash(password, 10)
  return newPassword
}

export default signUpRouter
