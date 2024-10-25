import express from 'express'

const salesRouter = express.Router()

salesRouter.get('/', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de ventas!')
})

salesRouter.get('/sales/:id', (req, res) => {
  res.send('Se esta buscando una venta!')
})

salesRouter.post('/sales', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de ventas!')
})

salesRouter.put('/sales/:id', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de ventas!')
})

salesRouter.delete('/sales/:id', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de ventas!')
})

export default salesRouter
