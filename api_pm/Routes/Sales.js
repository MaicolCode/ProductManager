import express from 'express'
import { connection } from '../utils/connection.js'

const salesRouter = express.Router()

salesRouter.get('/', async (req, res) => {
  const [sales] = await connection.query('SELECT * FROM sales')
  res.json({ sales })
})

salesRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const [sale] = await connection.query('SELECT * FROM sales WHERE id = ?', [
    id
  ])

  res.json({ sale })
})

salesRouter.post('/add', async (req, res) => {
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
})

salesRouter.put('/:id', async (req, res) => {
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
})

salesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await connection.query('DELETE FROM sales WHERE id = ?', [id])
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar venta' })
  }

  const [sale] = await connection.query('SELECT * FROM sales WHERE id = ?', [
    id
  ])

  if (sale.length === 0) {
    return res.status(404).json({ error: 'No se encontro la venta' })
  }
  res.json({ message: 'Venta eliminada con exito' })
})

export default salesRouter
