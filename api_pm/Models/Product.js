import { connection } from '../utils/connection.js'

export default class Product {
  static async getAll() {
    const [products] = await connection.query(
      'SELECT p.id, p.name, p.price, p.quantity, c.name AS category FROM products p INNER JOIN categories c ON p.id_category = c.id ORDER BY c.name;'
    )
    return products
  }

  static async getById(id) {
    const [product] = await connection.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    )
    return product[0]
  }

  static async create(name, price, quantity) {
    try {
      await connection.query(
        'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)',
        [name, price, quantity]
      )
    } catch (error) {
      return error
    }
    const [product] = await connection.query('SELECT * FROM products')
    return product[product.length - 1]
  }

  static async update(id, data) {
    try {
      await connection.query('UPDATE products SET ? WHERE id = ?', [data, id])
    } catch (error) {
      return error
    }
    const [product] = await connection.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    )
    if (!product) {
      return 'Producto no encontrado'
    }
    return 'Producto actualizado con exito'
  }

  static async delete(id) {
    try {
      await connection.query('DELETE FROM products WHERE id = ?', [id])
    } catch (error) {
      return error
    }

    const [product] = await connection.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    )

    if (!product) {
      return 'Producto no encontrado'
    }

    return 'Producto eliminado con exito'
  }
}
