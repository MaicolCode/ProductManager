import Category from '../Models/Category.js'

export class CategoryController {
  static async getAll(req, res) {
    const categories = await Category.getAll()
    return res.json({ categories })
  }

  static async getById(req, res) {
    const { id } = req.params
    const category = await Category.getById(id)
    return res.json({ category })
  }

  static async create(req, res) {
    const { name } = req.body

    const result = await Category.create(name)
    return res.json({ result })
  }

  static async update(req, res) {
    const { id } = req.params
    const data = req.body

    const result = await Category.update(id, data)

    return res.json({ result })
  }

  static async delete(req, res) {
    const { id } = req.params
    const result = await Category.delete(id)

    res.json({ result })
  }
}
