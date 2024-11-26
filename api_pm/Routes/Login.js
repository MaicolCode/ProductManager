import { Router } from 'express'
import { connection } from '../utils/connection.js'
import bcrypt from 'bcrypt'
import {
  generateAccessToken,
  generateRefreshToken
} from '../auth/generateToken.js'
import { getUserData } from '../lib/getUserData.js'

const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing parameters' })
  }

  const [user] = await connection.query(
    'SELECT name, username, password, permissions, type  FROM users u, user_type ut WHERE u.username = ? AND u.permissions = ut.id;',
    [username]
  )

  if (user.length > 0) {
    const isCorrect = await verifyPassword(password, user[0].password)

    if (isCorrect) {
      const accessToken = createAccessToken(user[0])
      const refreshToken = await createRefreshToken(user[0])

      return res
        .status(200)
        .json({ user: getUserData(user[0]), accessToken, refreshToken })
    } else {
      return res.status(400).json({ message: 'User or password incorrect' })
    }
  } else {
    return res.status(400).json({ message: 'User not found' })
  }
})

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash)
}

function createAccessToken(user) {
  return generateAccessToken(getUserData(user))
}

// Cuidar la seguridad del refresh token

async function createRefreshToken(user) {
  const refreshToken = generateRefreshToken(getUserData(user))

  try {
    await connection.query(
      'INSERT INTO refresh_tokens (id, refresh_token) VALUES (UUID_TO_BIN(UUID()), ?)',
      [refreshToken]
    )
    return refreshToken
  } catch (error) {
    console.error(error)
  }
}

export default loginRouter
