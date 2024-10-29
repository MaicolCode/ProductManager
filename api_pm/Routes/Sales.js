import express from 'express'
import { connection } from '../utils/connection.js'

const salesRouter = express.Router()

salesRouter.get('/', async (req, res) => {
  const [sales] = await connection.query('SELECT * FROM sales')
  res.json({ sales })
})

salesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  res.json({ sales_id: id })
})

salesRouter.post('/add', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de ventas!')
})

salesRouter.put('/:id', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de ventas!')
})

salesRouter.delete('/:id', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de ventas!')
})

export default salesRouter
