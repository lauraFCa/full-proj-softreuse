import LoginMethods from '../database/dbUsers.js'
import express from 'express'
import { generateToken } from './authenticate.js'
import bcrypt from 'bcrypt'

const signupRouter = express.Router()
const loginRouter = express.Router()

const db = new LoginMethods()

signupRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  console.log('criar')
  try {
    const user = await db.getUser(username)
    console.log(user.length)
    if (user.length > 0) {
      return res.status(400).json({ message: 'Usuario ja existe' })
    } else {
      const passwordHash = await bcrypt.hash(password, 10)
      console.log('encrypted password:', password, passwordHash)
      await db.createUser(username, passwordHash)

      res.status(201).json({ message: 'Usuario cadastrado com sucesso' })
    }
  } catch (error) {
    console.error('Erro ao cadastrar usuario:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
})

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  console.log('login', username, password)

  try {
    const user = await db.getUser(username)
    console.log(user)
    if (!user[0]) {
      return res.status(404).json({ message: 'Usuario nao encontrado' })
    } else {
      const match = await bcrypt.compare(password, user[0].password)
      if (!match) {
        return res.status(401).json({ message: 'Credenciais invalidas - Senha incorreta' })
      }

      const token = generateToken(user[0].id)

      res.json({ token })
    }
  } catch (error) {
    console.error('Erro ao autenticar usuario:', error)
    res.status(500).json({ message: 'Erro interno do servidor' })
  }
})

export { signupRouter, loginRouter }
