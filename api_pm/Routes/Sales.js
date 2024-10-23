import express from 'express'

const salesRouter = express.Router()

salesRouter.get('/', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de ventas!')
})

export default salesRouter
