import { connection } from '../utils/connection.js'

export default class SalesController {
  static async getAll (req, res) {
    const [sales] = await connection.query('SELECT * FROM sales')
    res.json({ sales })
  }

  static async getById (req, res) {
    const { id } = req.params
    const [sale] = await connection.query('SELECT * FROM sales WHERE id = ?', [
      id
    ])

    res.json({ sale })
  }

  static async create (req, res) {
    const { productID, quantity } = req.body

    try {
      await connection.query(
        'INSERT INTO sales (product_id, quantity_sold) VALUES (?,?)',
        [productID, quantity]
      )
    } catch (error) {
      return res.status(500).json({ error: 'Error al agregar venta' })
    }

    const [sales] = await connection.query('SELECT * FROM sales')

    res.json({ sale: sales[sales.length - 1] })
  }

  static async update (req, res) {
    const { id } = req.params
    const data = req.body

    try {
      await connection.query('UPDATE sales SET ? WHERE id = ?', [data, id])
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar venta' })
    }

    const [sale] = await connection.query('SELECT * FROM sales WHERE id = ?', [
      id
    ])

    if (sale.length === 0) {
      return res.status(404).json({ error: 'No se encontro la venta' })
    }

    res.json({ message: 'Venta actualizada con exito' })
  }

  static async delete (req, res) {
    const { id } = req.params

    const [sale] = await connection.query('SELECT * FROM sales WHERE id = ?', [
      id
    ])

    if (sale.length === 0) {
      return res.status(404).json({ error: 'No se encontro la venta' })
    }

    try {
      await connection.query('DELETE FROM sales WHERE id = ?', [id])
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar venta' })
    }

    res.json({ message: 'Venta eliminada con exito' })
  }
}
