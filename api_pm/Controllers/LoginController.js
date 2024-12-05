import RefreshToken from '../Models/RefreshToken.js'
import bcrypt from 'bcrypt'
import User from '../Models/User.js'
import { getUserData } from '../lib/getUserData.js'
import { generateAccessToken } from '../auth/generateToken.js'

export class LoginController {
  static async validateLogin(req, res) {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Missing parameters' })
    }

    const user = await User.getUserByUserName(username)

    if (user) {
      const isCorrect = await verifyPassword(password, user.password)

      if (isCorrect) {
        const accessToken = createAccessToken(user)
        const refreshToken = await RefreshToken.createRefreshToken(user)

        return res
          .status(200)
          .json({ user: getUserData(user), accessToken, refreshToken })
      } else {
        return res.status(400).json({ message: 'User or password incorrect' })
      }
    } else {
      return res.status(400).json({ message: 'User not found' })
    }

    // Verificar contraseña hasheada
    async function verifyPassword(password, hash) {
      return await bcrypt.compare(password, hash)
    }

    // Creacion del token de acceso
    function createAccessToken(user) {
      return generateAccessToken(getUserData(user))
    }
  }
}
