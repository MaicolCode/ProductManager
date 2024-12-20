import express from 'express'
import cors from 'cors'
import productRouter from './Routes/Products.js'
import salesRouter from './Routes/Sales.js'
import loginRouter from './Routes/Login.js'
import refreshTokenRouter from './Routes/RefreshToken.js'
import usersRouter from './Routes/Users.js'
import signUpRouter from './Routes/SignUp.js'
import dotenv from 'dotenv'
import { authenticate } from './auth/authenticate.js'
import signOutRouter from './Routes/SignOut.js'
import categoriesRouter from './Routes/Categories.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/products', productRouter)
app.use('/categories', categoriesRouter)
app.use('/sales', salesRouter)
app.use('/login', loginRouter)
app.use('/refresh-token', refreshTokenRouter)
app.use('/user', usersRouter)
app.use('/signup', signUpRouter)
app.use('/signout', signOutRouter)

app.listen(port, () => {
  console.log(`Server listener in port http://localhost:${port}`)
})
