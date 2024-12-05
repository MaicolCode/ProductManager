import { Router } from 'express'
import { LoginController } from '../Controllers/LoginController.js'

const loginRouter = Router()

loginRouter.post('/', LoginController.validateLogin)

export default loginRouter
