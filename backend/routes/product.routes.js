import express from 'express'
import { getProducts, getSingleProduct } from '../controllers/product.controller.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getSingleProduct)

export default router
