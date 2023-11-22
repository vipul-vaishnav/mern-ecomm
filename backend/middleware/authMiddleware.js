import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/user.model.js'

// Protect Routes
const protect = asyncHandler(async (req, res, next) => {
  let token

  token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      const user = await User.findById(decoded.userId).select('-password')
      req.user = user
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not Authorised, Invalid Token!!!')
    }
  } else {
    res.status(401)
    throw new Error('Not Authorised, No Token!!!')
  }
})

// Admin Route
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not Authorised, Not An Admin!!!')
  }
}

export { admin, protect }
