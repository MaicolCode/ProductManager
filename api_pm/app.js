import express from 'express'
import productRouter from './Routes/Products.js'
import salesRouter from './Routes/Sales.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/products', productRouter)
app.use('/sales', salesRouter)

app.listen(port, () => {
  console.log(`Server listener in port http://localhost:${port}`)
})
