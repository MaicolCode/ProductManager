import express from 'express'
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

const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
  const [products] = await connection.query('SELECT * FROM products')
  res.json({
    products
  })
})

productRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const [product] = await connection.query(
    'SELECT * FROM products WHERE id = ?',
    [id]
  )
  res.json({ product_id: product })
})

productRouter.post('/', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de productos!')
})

productRouter.put('/:id', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de productos!')
})

productRouter.delete('/:id', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de productos!')
})

export default productRouter
