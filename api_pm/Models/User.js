import { connection } from '../utils/connection.js'

export default class User {
  static async getAll() {
    const [users] = await connection.query(
      'SELECT BIN_TO_UUID(u.id) id, name, username, permissions, ut.type type FROM users u, user_type ut WHERE u.permissions = ut.id'
    )
    return users
  }

  static async getUserByUserName(username) {
    const [user] = await connection.query(
      'SELECT name, username, password, permissions, type  FROM users u, user_type ut WHERE u.username = ? AND u.permissions = ut.id;',
      [username]
    )

    return user[0]
  }

  static async delete(id) {
    try {
      const result = await connection.query(
        'DELETE FROM users WHERE id = UUID_TO_BIN(?)',
        [id]
      )

      if (result.affectedRows > 0) {
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
