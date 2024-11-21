import Sale from '../Models/Sale.js'

export default class SalesController {
  static async getAll(req, res) {
    const sales = await Sale.getAll()
    return res.json({
      sales
    })
  }

  static async getById(req, res) {
    const { id } = req.params
    const sale = await Sale.getById(id)
    return res.json({ sale })
  }

  static async create(req, res) {
    const { productID, quantity } = req.body

    const result = await Sale.create(productID, quantity)

    res.json({ sale: result })
  }

  static async update(req, res) {
    const { id } = req.params
    const data = req.body

    const result = await Sale.update(id, data)

    res.json({ message: result })
  }

  static async delete(req, res) {
    const { id } = req.params

    const result = await Sale.delete(id)

    res.json({ message: result })
  }

  static async report(req, res) {
    const result = await Sale.report()
    res.json({ result: result })
  }

  static async bestSellers(req, res) {
    const result = await Sale.bestSellers()
    res.json({ result: result })
  }

  static async bestGain(req, res) {
    const result = await Sale.bestGain()
    res.json({ result: result })
  }
}
