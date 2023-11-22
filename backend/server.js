import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import connectDB from './config/db.js'

import ProductRoutes from './routes/product.routes.js'
import UserRoutes from './routes/user.routes.js'
import OrderRoutes from './routes/order.routes.js'

import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const USER = process.env.DB_USER
const KEY = process.env.DB_KEY
let URI = process.env.DB_URI

URI = URI.replace('%USER%', USER).replace('%PASSWORD%', KEY)

const app = express()

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(cookieParser())
app.use(cors({}))

app.get('/', (req, res) => {
  res.send('Welcome to proshop')
})

app.get('/api/test', (req, res) => {
  res.json({
    status: 'OK',
    message: 'JAI SHREE RAM 🚩'
  })
})

app.use('/api/products', ProductRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/orders', OrderRoutes)

app.use(notFound)
app.use(errorHandler)

await connectDB(URI) // Connect to MongoDB

app.listen(PORT, () => {
  console.log(`Server listening to requests on PORT: ${PORT}`.underline.bold)
})
