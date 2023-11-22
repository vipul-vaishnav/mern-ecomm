import asyncHandler from '../middleware/asyncHandler.js'
import Order from './../models/order.model.js'

// @DESC:- fetches all orders
// @TYPE:- GET /api/orders
// @ACCESS:- private
const getOrders = asyncHandler(async (req, res) => {
  const products = await Order.find({})
  res.json({
    status: 'OK',
    message: 'Orders found successfully!',
    data: products
  })
})

// @DESC:- fetches order by id
// @TYPE:- GET /api/orders/:id
// @ACCESS:- private
const getOrderById = asyncHandler(async (req, res) => {
  const products = await Order.find({})
  res.json({
    status: 'OK',
    message: 'Orders found successfully!',
    data: products
  })
})

// @DESC:- update order to paid
// @TYPE:- PUT /api/orders/:id/pay
// @ACCESS:- private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const products = await Order.find({})
  res.json({
    status: 'OK',
    message: 'Orders found successfully!',
    data: products
  })
})

// @DESC:- update order to delivered
// @TYPE:- PUT /api/orders/:id/delivered
// @ACCESS:- private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const products = await Order.find({})
  res.json({
    status: 'OK',
    message: 'Orders found successfully!',
    data: products
  })
})

// @DESC:- create an order
// @TYPE:- POST /api/orders
// @ACCESS:- private
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        postalCode: shippingAddress.zipCode
      },
      paymentMethod
    })

    const createdOrder = await order.save()
    res.status(201).json({
      status: 'OK',
      message: 'Order created successfully',
      data: createdOrder
    })
  }
})

// @DESC:- get all user orders
// @TYPE:- POST /api/orders/myorders
// @ACCESS:- private
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id
  })
  res.status(200).json({
    status: 'OK',
    message: 'Orders',
    data: orders
  })
})

export {
  createOrder,
  getOrderById,
  getOrders,
  getUserOrders,
  updateOrderToDelivered,
  updateOrderToPaid
}
