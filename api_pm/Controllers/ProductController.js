import mysql from 'mysql2/promise'

// DB Config
const config = {
  host: 'localhost',
  user: 'root',
  password: 'MaicolCodea',
  database: 'tech_db',
  port: 3306
}

const connection = await mysql.createConnection(config)

export default class ProductController {
  static async getAll(req, res) {
    const [products] = await connection.query('SELECT * FROM products')
    return res.json({
      products
    })
  }

  static async getById(req, res) {
    const { id } = req.params
    const [product] = await connection.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    )
    return res.json({ product_id: product })
  }

  static async create(req, res) {
    const { name, price, quantity } = req.body

    try {
      await connection.query(
        'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)',
        [name, price, quantity]
      )
    } catch (error) {
      return res.status(400).json({ error: 'Error al insertar producto' })
    }
    const [product] = await connection.query('SELECT * FROM products')
    return res.json({ product: product[product.length - 1] })
  }

  static async update(req, res) {
    const { id } = req.params
    const data = req.body

    try {
      await connection.query('UPDATE products SET ? WHERE id = ?', [data, id])
    } catch (error) {
      return res.status(400).json({ error: 'Error al actualizar el producto' })
    }

    const [product] = await connection.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    )
    if (product.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    return res.json({ product })
  }

  static async delete(req, res) {
    const { id } = req.params
    const [product] = await connection.query(
      'SELECT * FROM products WHERE id = ?',
      [id]
    )

    if (product.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    try {
      await connection.query('DELETE FROM products WHERE id = ?', [id])
    } catch (error) {
      return res.status(400).json({ error: 'Error al eliminar producto' })
    }

    res.json({ message: 'Producto eliminado con exito' })
  }
}
