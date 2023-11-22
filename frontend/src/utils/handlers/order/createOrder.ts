import { TShipping } from '../../../lib/ShippingSchema'
import { CartItem } from '../../../store/store'
import { Response } from '../../../types/Response'
import { CREATE_ORDER } from '../../endpoints'
import { httpClient } from '../../httpClient'

type P = {
  orderItems: CartItem[]
  shippingAddress: TShipping
  paymentMethod: string
}

export interface Order {
  user: string
  orderItems: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  isPaid: boolean
  isDeliverd: boolean
  _id: string
  createdAt: Date
  updatedAt: Date
  v: number
}

export interface OrderItem {
  product: Product
  qty: number
  id: string
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  image: string
  price: number
}

export interface ShippingAddress {
  address: string
  city: string
  postalCode: string
  state: string
}

export const createOrder = async (payload: P) => {
  const res = await httpClient.post<Response<Order>>(CREATE_ORDER, payload)
  const data = res.data
  return data
}
