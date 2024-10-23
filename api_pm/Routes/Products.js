import express from 'express'

const router = express.Router()

router.get('/productos', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de productos!')
})

export default router
