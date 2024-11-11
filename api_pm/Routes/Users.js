import { Router } from 'express'

const usersRouter = Router()

usersRouter.get('/', (req, resp) => {
  resp.send('Users')
})

export default usersRouter
