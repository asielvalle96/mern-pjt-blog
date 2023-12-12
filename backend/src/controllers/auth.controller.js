import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import secretKeyForAuthToken from '../../conf.js'

export const register = async (req, res) => {
  const { username, password } = req.body
  // res.json('Register OK.')

  const salt = bcryptjs.genSaltSync(10)

  try {
    // Save the user in the DB.
    const user = await User.create({
      username,
      password: bcryptjs.hashSync(password, salt)
    })
    res.json(user)
  } catch (error) {
    res.status(400).json({ 'Error from register function in the backend: ': error.message })
  }
}

export const login = async (req, res) => {
  const { username, password } = req.body

  try {
    // Save the user in the DB.
    const userFound = await User.findOne({ username })

    if (!userFound) res.json('Username not found. From login function in the Backend.')

    const passwordMatch = bcryptjs.compareSync(password, userFound.password)
    if (passwordMatch) {
      // Create the token of authentication.
      jwt.sign({ username, id: userFound._id }, secretKeyForAuthToken, {}, (err, token) => {
        // This callback handles the error and the token.

        // If error, return it;
        if (err) throw err

        // if not error, return the token.
        res.cookie('tokenBlog', token).json({
          id: userFound._id,
          username
        })
      })
    } else {
      res.status(400).json('Password incorrect. From login in Backend.')
    }
  } catch (err) {
    res.status(400).json({ 'Error. From login in Backend: ': err.message })
  }
}

export const profile = (req, res) => {
  const { tokenBlog } = req.cookies
  // res.json(req.cookies)

  if (!tokenBlog) {
    res.status(401).json({ message: 'Unauthorized. From profile function in Backend.' })
  } else {
    // I get the user using the token.
    jwt.verify(tokenBlog, secretKeyForAuthToken, {}, (err, data) => {
      // If error, return it.
      if (err) throw err

      // if not error, return the "data".
      // In this case, the variable "data" has username, id, iat.
      res.json(data)
    })
  }
}

export const logout = (req, res) => {
  res.cookie('tokenBlog', '').json('ok')
}
