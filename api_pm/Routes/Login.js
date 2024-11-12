import { Router } from 'express'

const loginRouter = Router()

loginRouter.post('/', (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing parameters' })
  }

  const accessToken = 'AccessToken'
  const refreshToken = 'RefreshToken'

  const user = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe'
  }
  return res.status(200).json({ user, accessToken, refreshToken })
})

export default loginRouter
