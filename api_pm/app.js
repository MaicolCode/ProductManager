import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hola bienvenido a la API para la gestion de productos!')
})

app.listen(port, () => {
  console.log(`Server listener in port http://localhost:${port}`)
})
