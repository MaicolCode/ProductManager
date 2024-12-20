import { connection } from '../utils/connection.js'

export default class Category {
  static async getAll() {
    const [categories] = await connection.query(
      'SELECT * FROM categories ORDER BY name'
    )
    return categories
  }

  static async getById(id) {
    const [category] = await connection.query(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    )
    return category[0]
  }

  static async create(name) {
    try {
      await connection.query('INSERT INTO categories (name) VALUES (?)', [name])
    } catch (error) {
      return error
    }
    const [category] = await connection.query('SELECT * FROM categories')
    return category[category.length - 1]
  }

  static async update(id, data) {
    try {
      await connection.query('UPDATE categories SET ? WHERE id = ?', [data, id])
    } catch (error) {
      return error
    }
    const [category] = await connection.query(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    )
    if (!category) {
      return 'Categoría no encontrada'
    }
    return 'Categoría actualizada con exito'
  }

  static async delete(id) {
    try {
      await connection.query('DELETE FROM categories WHERE id = ?', [id])
    } catch (error) {
      return error
    }
    const [category] = await connection.query(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    )
    if (!category) {
      return 'Categoría no encontrada'
    }
    return 'Categoría eliminada con exito'
  }
}
