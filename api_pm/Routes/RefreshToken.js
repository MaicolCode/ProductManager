import { Router } from 'express'

const refreshTokenRouter = Router()

refreshTokenRouter.get('/', (req, resp) => {
  resp.send('Refresh Token')
})

export default refreshTokenRouter
