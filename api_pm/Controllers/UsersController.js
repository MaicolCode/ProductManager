import User from '../Models/User.js'

export default class UsersController {
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
