import express from 'express'

const productRouter = express.Router()

productRouter.get('/', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de productos!')
})

productRouter.get('/product/:id', (req, res) => {
  res.send('Se esta buscando un producto!')
})

productRouter.post('/product', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de productos!')
})

productRouter.put('/product/:id', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de productos!')
})

productRouter.delete('/product/:id', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de productos!')
})

export default productRouter
