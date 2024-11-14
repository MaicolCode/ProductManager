import { Router } from 'express'
import { getTokenFromHeader } from '../auth/getTokenFromHeader.js'
import { connection } from '../utils/connection.js'
import { verifyRefreshToken } from '../auth/validateToken.js'
import { generateAccessToken } from '../auth/generateToken.js'

const refreshTokenRouter = Router()

refreshTokenRouter.post('/', async (req, resp) => {
  const refreshToken = getTokenFromHeader(req.headers)

  if (refreshToken) {
    try {
      const found = await findOne(refreshToken)
      if (!found) {
        return resp.status(401).json({ message: 'Unauthorized not found ' })
      }
      const payload = verifyRefreshToken(found.refresh_token)

      if (payload) {
        const accessToken = generateAccessToken(payload.user)
        resp.status(200).json({ accessToken })
      } else {
        return resp
          .status(401)
          .json({ message: 'Unauthorized not token access' })
      }
    } catch (error) {}
  } else {
    resp.status(401).json({ message: 'Unauthorized Link' })
  }
})

async function findOne(refreshToken) {
  try {
    const [token] = await connection.query(
      'SELECT * FROM refresh_tokens WHERE refresh_token = ?',
      [refreshToken]
    )

    if (token.length > 0) {
      return token[0]
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
  }
}
export default refreshTokenRouter
