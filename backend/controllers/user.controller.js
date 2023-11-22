import { genToken } from '../utils/genToken.js'
import asyncHandler from './../middleware/asyncHandler.js'
import User from './../models/user.model.js'

// @DESC:- AUTH user and get token
// @TYPE:- POST /api/users/login
// @ACCESS:- public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPasswords(password))) {
    genToken(res, user._id)

    res.status(200).json({
      status: 'OK',
      message: 'User login successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  res.send('Auth User')
})

// @DESC:- Register user and get token
// @TYPE:- POST /api/users
// @ACCESS:- public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userAlreadyExists = await User.findOne({ email })

  if (userAlreadyExists) {
    res.status(400)
    throw new Error('Email already exists!')
  } else {
    const user = await User.create({
      name,
      email,
      password
    })

    if (user) {
      genToken(res, user._id)

      res.status(201).json({
        status: 'OK',
        message: 'User created successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin
        }
      })
    } else {
      res.status(400)
      throw new Error('Invalid User Data')
    }
  }
})

// @DESC:- Logout user and clear cookie
// @TYPE:- POST /api/users/logout
// @ACCESS:- private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expiresIn: new Date(0)
  })

  res.status(200).json({
    message: 'Logged out successfully!'
  })
})

// @DESC:- get user data
// @TYPE:- GET /api/users/profile
// @ACCESS:- private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.status(200).json({
      status: 'OK',
      message: 'User found successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

// @DESC:- update user data
// @TYPE:- PUT /api/users/profile
// @ACCESS:- private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.status(200).json({
      status: 'OK',
      message: 'User updated successfully',
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
      }
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

// @DESC:- Delete user data
// @TYPE:- DELETE /api/users/profile
// @ACCESS:- private
const deleteUser = asyncHandler(async (req, res) => {
  res.send('Delete User Data')
})

// ================ ADMIN CONTROLLERS ===================

// get user by id | GET /api/users/:id | private & admin
const getUserById = asyncHandler(async (req, res) => {
  res.send(`User id: ${req.params.id}`)
})
// get all users | GET /api/users | private & admin
const getAllUsers = asyncHandler(async (req, res) => {
  res.send('All users')
})
// delete a user by id | DELETE /api/users/:id | private & admin
const deleteUserById = asyncHandler(async (req, res) => {
  res.send('delete user ' + req.params.id)
})
// update a user by id | PUT /api/users/:id | private & admin
const updateUserById = asyncHandler(async (req, res) => {
  res.send('update user ' + req.params.id)
})

export {
  authUser,
  deleteUser,
  getUser,
  registerUser,
  logoutUser,
  updateUser,
  getUserById,
  getAllUsers,
  deleteUserById,
  updateUserById
}
