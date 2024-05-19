import express from 'express'
import pkg from 'body-parser'

import { signupRouter, loginRouter } from './controllers/login.js'
import salesRoutes from './controllers/sales.js'
const { json } = pkg

const app = express()
const PORT = 3000

app.use(json())

app.use('/signup', signupRouter)
app.use('/login', loginRouter)
app.use('/sales', salesRoutes)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
