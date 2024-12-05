import { generateRefreshToken } from '../auth/generateToken.js'
import { getUserData } from '../lib/getUserData.js'
import { connection } from '../utils/connection.js'

export default class RefreshToken {
  static async findOne(refreshToken) {
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

  static async createRefreshToken(user) {
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

  static async deleteByToken(token) {
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
}
