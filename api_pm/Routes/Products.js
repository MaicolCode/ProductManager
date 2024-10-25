import express from 'express'

const productRouter = express.Router()

productRouter.get('/', (req, res) => {
  res.json({
    message: 'Hola bienvenido a la API para la gestion de productos!'
  })
})

productRouter.get('/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  res.json({ product_id: id })
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
