import Product from '../Models/Product.js'

export default class ProductController {
  static async getAll(req, res) {
    const products = await Product.getAll()
    return res.json({
      products
    })
  }

  static async getById(req, res) {
    const { id } = req.params
    const product = await Product.getById(id)
    return res.json({ product })
  }

  static async create(req, res) {
    const { name, price, quantity } = req.body

    const result = await Product.create(name, price, quantity)
    return res.json({ result })
  }

  static async update(req, res) {
    const { id } = req.params
    const data = req.body

    const result = await Product.update(id, data)

    return res.json({ result })
  }

  static async delete(req, res) {
    const { id } = req.params
    const result = await Product.delete(id)

    res.json({ result })
  }
}
