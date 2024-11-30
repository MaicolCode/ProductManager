import { Router } from 'express'
import { connection } from '../utils/connection.js'
import { authenticate } from '../auth/authenticate.js'

const usersRouter = Router()

class User {
  static async getAll() {
    const [users] = await connection.query(
      'SELECT BIN_TO_UUID(u.id) id, name, username, permissions, ut.type type FROM users u, user_type ut WHERE u.permissions = ut.id'
    )
    return users
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

class UsersController {
  static async getAll(req, res) {
    const result = await User.getAll()
    res.status(200).json(result)
  }
  static async delete(req, res) {
    const { id } = req.params
    const result = await User.delete(id)
    if (result === true) {
      res.status(200).json({ message: 'User deleted successfully' })
    } else {
      res.status(400).json({ message: 'User not found' })
    }
  }
}

usersRouter.get('/', authenticate, (req, resp) => {
  resp.status(200).json({ user: req.user })
})

usersRouter.get('/all', UsersController.getAll)
usersRouter.delete('/:id', UsersController.delete)

export default usersRouter
