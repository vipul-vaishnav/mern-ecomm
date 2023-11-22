import React, { useEffect, useState } from 'react'
import { useCartStore } from '../store/store'
import { LocalStorage } from '../utils/LocalStorage'
import { TShipping } from '../lib/ShippingSchema'
import Button from '../components/shared/Button'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { createOrder } from '../utils/handlers/order/createOrder'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'

type PlaceOrderProps = Record<string, string>

const PlaceOrder: React.FC<PlaceOrderProps> = () => {
  const { items } = useCartStore()
  const navigate = useNavigate()
  const [shipping] = useState<TShipping>(() => LocalStorage.get('pro_shop_shipping_data'))
  const [payment] = useState<'online' | 'cod'>(() => LocalStorage.get('pro_shop_payment_mode'))

  const mutation = useMutation(createOrder, {
    onSuccess: (data) => {
      LocalStorage.remove('pro_shop_payment_mode')
      LocalStorage.remove('proshop_cart')
      toast.success(data.message)
      navigate('/orders')
    },
    onError: (err) => {
      if (err instanceof AxiosError) toast.error(err.response?.data.message)
      else if (err instanceof Error) toast.error(err.message)
      else toast.error('Unable to place order! Failed')
    }
  })

  const handleOrder = async () => {
    if (payment === 'online') {
      console.log('By')
    } else {
      mutation.mutate({
        orderItems: items,
        paymentMethod: payment,
        shippingAddress: shipping
      })
    }
  }

  useEffect(() => {
    if (LocalStorage.get('pro_shop_shipping_data') && LocalStorage.get('pro_shop_payment_mode')) {
      return
    } else {
      navigate('/cart')
    }
  }, [])

  return (
    <div>
      <div className="my-12">
        <div className="mx-auto mb-12 max-w-max">
          <ul className="steps">
            <li className="step step-success">Login</li>
            <li className="step step-success">Shipping</li>
            <li className="step step-success">Payments</li>
            <li className="step step-success">Place Order</li>
          </ul>
        </div>

        <h1 className="max-w-screen-md mx-auto text-3xl font-semibold">Order Details</h1>

        <div className="max-w-screen-md mx-auto my-6">
          <div>
            {items.map((item) => {
              return (
                <div key={item.product.id} className="flex items-center gap-6 my-2 ">
                  <div>
                    <img src={item.product.image} alt={item.product.title} width={24} />
                  </div>
                  <span className="font-medium">{item.product.title}</span> Qty. - {item.qty}
                </div>
              )
            })}
          </div>
        </div>

        <h1 className="max-w-screen-md mx-auto text-3xl font-semibold">Shipping Details</h1>

        <div className="max-w-screen-md mx-auto my-6">
          <p>{shipping.name}</p>
          <p>{shipping.phone}</p>
          <p>{shipping.email}</p>
          <br />
          <p className="font-semibold">{shipping.address}</p>
          <p>{shipping.city}</p>
          <p>{shipping.zipCode}</p>
          <p>{shipping.state}</p>
        </div>

        <h1 className="max-w-screen-md mx-auto text-3xl font-semibold">Payment Details</h1>

        <div className="max-w-screen-md mx-auto my-6">
          <p>{payment}</p>
        </div>

        <div className="max-w-screen-md mx-auto my-6">
          <Button type="button" onClick={handleOrder}>
            {payment === 'cod' ? 'Place Order' : 'Pay Now'}
          </Button>
        </div>
      </div>
    </div>
  )
}
export default PlaceOrder
