import { Router } from 'express'
import RefreshTokensController from '../Controllers/RefereshTokensController.js'

const refreshTokenRouter = Router()

refreshTokenRouter.post('/', RefreshTokensController.getRefreshToken)

export default refreshTokenRouter
