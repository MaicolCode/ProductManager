import express from 'express'

const salesRouter = express.Router()

salesRouter.get('/', (req, res) => {
  res.json({ message: 'Hola bienvenido a la API para la gestion de ventas!' })
})

salesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  res.json({ sales_id: id })
})

salesRouter.post('/sales', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de ventas!')
})

salesRouter.put('/:id', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de ventas!')
})

salesRouter.delete('/:id', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de ventas!')
})

export default salesRouter
