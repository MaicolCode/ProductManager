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
        'SELECT MONTH(date_sale) AS month_sales, SUM(quantity_sold) AS quantity_sold FROM sales GROUP BY month_sales ORDER BY month_sales'
      )
      if (sales) {
        return sales
      } else {
        return { message: 'sales not informed' }
      }
    } catch (error) {
      return error
    }
  }

  static async bestSellers() {
    try {
      const [sales] = await connection.query(
        'SELECT p.id AS product_id, p.name AS name, SUM(s.quantity_sold) AS quantity_sold, p.price AS price FROM products p JOIN sales s ON p.id = s.product_id GROUP BY p.id ORDER BY quantity_sold desc LIMIT 1'
      )
      if (sales) {
        return sales
      } else {
        return { message: 'sales not informed' }
      }
    } catch (error) {
      return error
    }
  }

  static async bestGain() {
    try {
      const [sales] = await connection.query(
        'SELECT p.id AS product_id, p.name AS name, SUM(quantity_sold) quantity_sale,SUM(p.price) AS best_price FROM products p JOIN sales s ON p.id = s.product_id GROUP BY p.id ORDER BY best_price desc LIMIT 1'
      )
      if (sales) {
        return sales
      } else {
        return { message: 'sales not informed' }
      }
    } catch (error) {
      return error
    }
  }
}
