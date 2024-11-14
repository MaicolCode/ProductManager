import { getTokenFromHeader } from './getTokenFromHeader'
import { verifyAccessToken } from './validateToken'

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
