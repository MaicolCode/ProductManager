import { Router } from 'express'

const loginRouter = Router()

loginRouter.get('/', (req, resp) => {
  resp.send('Login')
})

export default loginRouter
