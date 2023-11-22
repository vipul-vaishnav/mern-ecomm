import asyncHandler from '../middleware/asyncHandler.js'
import Product from './../models/product.model.js'

// @DESC:- fetches all products
// @TYPE:- GET /api/products
// @ACCESS:- public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json({
    status: 'OK',
    message: 'Products found successfully!',
    data: products
  })
})

// @DESC:- fetches single product by id
// @TYPE:- GET /api/products/:id
// @ACCESS:- public
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json({
      data: 'product'
    })
  } else {
    res.status(404)
    throw new Error('Resource not found')
  }
})

export { getProducts, getSingleProduct }
