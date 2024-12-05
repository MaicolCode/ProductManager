import { generateAccessToken } from '../auth/generateToken.js'
import { getTokenFromHeader } from '../auth/getTokenFromHeader.js'
import { verifyRefreshToken } from '../auth/validateToken.js'
import RefreshToken from '../Models/RefreshToken.js'

export default class RefreshTokensController {
  static async getRefreshToken(req, res) {
    const refreshToken = getTokenFromHeader(req.headers)

    if (refreshToken) {
      try {
        const found = await RefreshToken.findOne(refreshToken)
        if (!found) {
          return res.status(401).json({ message: 'Unauthorized not found ' })
        }
        const payload = verifyRefreshToken(found.refresh_token)

        if (payload) {
          const accessToken = generateAccessToken(payload.user)
          res.status(200).json({ accessToken })
        } else {
          return res
            .status(401)
            .json({ message: 'Unauthorized not token access' })
        }
      } catch (error) {}
    } else {
      res.status(401).json({ message: 'Unauthorized Link' })
    }
  }

  static async createRefreshToken(req, res) {
    const result = await RefreshToken.createRefreshToken(req.user)
    return result
  }

  static async deleteToken(req, res) {
    const token = getTokenFromHeader(req.headers)

    if (token) {
      const deleted = await RefreshToken.deleteByToken(token)
      console.log(deleted)
      if (deleted) {
        res.status(200).json({ message: 'Token deleted' })
      } else {
        res.status(401).json({ message: 'Token not deleted' })
      }
    } else {
      res.status(401).json({ message: 'No token provided' })
    }
  }
}
