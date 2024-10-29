import Sale from '../Models/Sale.js'

export default class SalesController {
  static async getAll (req, res) {
    const result = await Sale.getAll()
    return res.json({
      result
    })
  }

  static async getById (req, res) {
    const { id } = req.params
    const sale = await Sale.getById(id)
    return res.json({ sale })
  }

  static async create (req, res) {
    const { productID, quantity } = req.body

    const result = await Sale.create(productID, quantity)

    res.json({ sale: result })
  }

  static async update (req, res) {
    const { id } = req.params
    const data = req.body

    const result = await Sale.update(id, data)

    res.json({ message: result })
  }

  static async delete (req, res) {
    const { id } = req.params

    const result = await Sale.delete(id)

    res.json({ message: result })
  }
}
