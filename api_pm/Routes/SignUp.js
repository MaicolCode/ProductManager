import { Router } from 'express'

export const signUpRouter = Router()

signUpRouter.post('/', (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing parameters' })
  }

  return res.status(200).json({ message: 'Sign up successful' })
})
