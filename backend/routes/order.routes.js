import express from 'express'
import {
  createOrder,
  getOrderById,
  getOrders,
  getUserOrders,
  updateOrderToDelivered,
  updateOrderToPaid
} from '../controllers/order.controller.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createOrder).get(protect, admin, getOrders)

router.route('/myorders').get(protect, getUserOrders)

router.route('/:id').get(protect, admin, getOrderById)

router.route('/:id/pay').put(protect, updateOrderToPaid)

router.route('/:id/delivered').delete(protect, admin, updateOrderToDelivered)

export default router
