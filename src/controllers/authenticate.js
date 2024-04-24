import jwt from 'jsonwebtoken'

const secretKey = 'A1B2C3D4E5F6G7H8'

/**
 * Generates a JWT token for the given user ID.
 * @param {string} userId - The user ID.
 * @returns {string} The generated JWT token.
 */
export const generateToken = (userId) => {
  console.log({ userId })
  return jwt.sign({ userId }, secretKey, { expiresIn: '10h' })
}

/**
 * Middleware function to authenticate a JWT token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({ message: 'Token de autenticacao nao fornecido' })
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(403).json({ message: 'Token de autenticacao invalido' })
    }
    req.userId = decoded.userId
    console.log(req.userId)
    next()
  })
}
