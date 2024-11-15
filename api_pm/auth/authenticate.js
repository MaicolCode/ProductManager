import { getTokenFromHeader } from './getTokenFromHeader.js'
import { verifyAccessToken } from './validateToken.js'

export function authenticate(req, res, next) {
  const token = getTokenFromHeader(req.headers)

  if (token) {
    const decoded = verifyAccessToken(token)

    if (decoded) {
      req.user = { ...decoded.user }
      next()
    } else {
      res.status(401).json({ message: 'Invalid token' })
    }
  } else {
    res.status(401).json({ message: 'No token provided' })
  }
}
