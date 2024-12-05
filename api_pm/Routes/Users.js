import { Router } from 'express'
import { authenticate } from '../auth/authenticate.js'
import UsersController from '../Controllers/UsersController.js'

const usersRouter = Router()

usersRouter.get('/', authenticate, (req, resp) => {
  resp.status(200).json({ user: req.user })
})

usersRouter.get('/all', UsersController.getAll)
usersRouter.delete('/:id', UsersController.delete)

export default usersRouter
