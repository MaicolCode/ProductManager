import { Router } from 'express'
import RefreshTokensController from '../Controllers/RefereshTokensController.js'

const signOutRouter = Router()

signOutRouter.delete('/', RefreshTokensController.deleteToken)

export default signOutRouter
