import express from 'express'

const productRoutes = require('./Routes/Products')
const saleRoutes = require('./Routes/Sales')

const app = express()
const port = process.env.PORT || 3000

app.use('/products', productRoutes)
app.use('/sales', saleRoutes)

app.listen(port, () => {
  console.log(`Server listener in port http://localhost:${port}`)
})
