import { connection } from '../utils/connection.js'

export default class Sale {
  static async getAll() {
    const [sales] = await connection.query('SELECT * FROM sales')
    return sales
  }

  static async getById(id) {
    const [sale] = await connection.query('SELECT * FROM sales WHERE id = ?', [
      id
    ])
    return sale[0]
  }

  static async create(productID, quantity) {
    try {
      await connection.query(
        'INSERT INTO sales (product_id, quantity_sold) VALUES (?,?)',
        [productID, quantity]
      )
    } catch (error) {
      return error
    }
    const [sales] = await connection.query('SELECT * FROM sales')
    return sales[sales.length - 1]
  }

  static async update(id, data) {
    try {
      await connection.query('UPDATE sales SET ? WHERE id = ?', [data, id])
    } catch (error) {
      return error
    }
    const [sale] = await connection.query('SELECT * FROM sales WHERE id = ?', [
      id
    ])
    if (sale.length === 0) {
      return 'Venta no encontrada'
    }
    return 'Venta actualizada con exito'
  }

  static async delete(id) {
    const [sale] = await connection.query('SELECT * FROM sales WHERE id = ?', [
      id
    ])

    if (sale.length === 0) {
      return 'Venta no encontrada'
    }
    try {
      await connection.query('DELETE FROM sales WHERE id = ?', [id])
    } catch (error) {
      return error
    }

    return 'Venta eliminada con exito'
  }

  static async report() {
    try {
      const [sales] = await connection.query(
        'SELECT DATE(date_sale) 	AS date_sale, SUM(quantity_sold) quantity_sale FROM sales group by DATE(date_sale)'
      )
      if (sales) {
        return sales
      } else {
        return { message: 'sales not informed' }
      }
    } catch (error) {
      return error
    }
    return 'Venta actualizada con exito'
  }
}
