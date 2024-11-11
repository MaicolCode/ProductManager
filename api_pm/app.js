import express from 'express'
import cors from 'cors'
import productRouter from './Routes/Products.js'
import salesRouter from './Routes/Sales.js'
import loginRouter from './Routes/Login.js'
import refreshTokenRouter from './Routes/RefreshToken.js'
import usersRouter from './Routes/Users.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use('/products', productRouter)
app.use('/sales', salesRouter)
app.use('/login', loginRouter)
app.use('/refreshToken', refreshTokenRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
  console.log(`Server listener in port http://localhost:${port}`)
})
