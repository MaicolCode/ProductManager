import express from 'express'

const productRouter = express.Router()

productRouter.get('/', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de productos!')
})

export default productRouter
