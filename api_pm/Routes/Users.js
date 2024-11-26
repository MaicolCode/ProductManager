import { Router } from 'express'
import { connection } from '../utils/connection.js'

const usersRouter = Router()

class User {
  static async getAll() {
    const [users] = await connection.query(
      'SELECT name, username, permissions, type FROM users u, user_type ut WHERE u.permissions = ut.id;'
    )
    return users
  }
}

class UsersController {
  static async getAll(req, res) {
    const result = await User.getAll()
    res.status(200).json(result)
  }
}

usersRouter.get('/', (req, resp) => {
  resp.status(200).json({ user: req.user })
})

usersRouter.get('/all', UsersController.getAll)

export default usersRouter
