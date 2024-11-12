import { Router } from 'express'

const signUpRouter = Router()

signUpRouter.post('/', (req, res) => {
  const { name, username, password } = req.body

  if (!name || !username || !password) {
    return res.status(400).json({ message: 'Missing parameters' })
  }

  return res.status(200).json({ message: 'Sign up successful' })
})

export default signUpRouter
