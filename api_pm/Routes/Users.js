import { Router } from 'express'

const usersRouter = Router()

usersRouter.get('/', (req, resp) => {
  resp.status(200).json({ user: req.user })
})

export default usersRouter
