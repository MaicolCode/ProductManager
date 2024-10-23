import express from 'express'

const router = express.Router()

router.get('/sales', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de ventas!')
})
