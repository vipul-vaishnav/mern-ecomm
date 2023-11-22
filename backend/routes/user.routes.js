import express from 'express'
import {
  authUser,
  deleteUser,
  getUser,
  logoutUser,
  registerUser,
  updateUser,
  getUserById,
  getAllUsers,
  deleteUserById,
  updateUserById
} from '../controllers/user.controller.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getAllUsers)

router.post('/auth', authUser)
router.post('/logout', logoutUser)

router.route('/profile').get(protect, getUser).put(protect, updateUser).delete(protect, deleteUser)

router
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserById)
  .delete(protect, admin, deleteUserById)

export default router
