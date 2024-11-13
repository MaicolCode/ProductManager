import express from 'express'
import cors from 'cors'
import productRouter from './Routes/Products.js'
import salesRouter from './Routes/Sales.js'
import loginRouter from './Routes/Login.js'
import refreshTokenRouter from './Routes/RefreshToken.js'
import usersRouter from './Routes/Users.js'
import signUpRouter from './Routes/SignUp.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/products', productRouter)
app.use('/sales', salesRouter)
app.use('/login', loginRouter)
app.use('/refreshToken', refreshTokenRouter)
app.use('/users', usersRouter)
app.use('/signup', signUpRouter)

app.listen(port, () => {
  console.log(`Server listener in port http://localhost:${port}`)
})
