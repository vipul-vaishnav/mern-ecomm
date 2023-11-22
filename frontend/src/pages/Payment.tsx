import React, { useEffect, useState } from 'react'
import Button from '../components/shared/Button'
import { useNavigate } from 'react-router-dom'
import { LocalStorage } from '../utils/LocalStorage'

type PaymentProps = Record<string, string>

const Payment: React.FC<PaymentProps> = () => {
  const navigate = useNavigate()

  const [payment, setPayment] = useState<'online' | 'cod'>('online')

  useEffect(() => {
    if (LocalStorage.get('pro_shop_payment_mode'))
      setPayment(LocalStorage.get('pro_shop_payment_mode'))
    else setPayment('online')
  }, [])

  const handlePayment = () => {
    LocalStorage.set('pro_shop_payment_mode', payment)
    navigate('/placeorder')
  }

  useEffect(() => {
    if (LocalStorage.get('pro_shop_shipping_data')) {
      return
    } else {
      navigate('/cart')
    }
  }, [])

  return (
    <div>
      <div className="mx-auto my-12 max-w-max">
        <ul className="steps">
          <li className="step step-success">Login</li>
          <li className="step step-success">Shipping</li>
          <li className="step step-success">Payments</li>
          <li className="step">Place Order</li>
        </ul>
      </div>
      <div className="max-w-screen-sm mx-auto my-12">
        <h1 className="max-w-screen-md mx-auto text-3xl font-semibold">Checkout Information</h1>

        <div className="my-6 form-control">
          <label className="cursor-pointer label">
            <span className="font-medium label-text">Pay Now</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-amber-500"
              checked={payment === 'online'}
              onChange={(e) => setPayment(e.target.checked ? 'online' : 'cod')}
            />
          </label>
        </div>
        <div className="my-6 form-control">
          <label className="cursor-pointer label">
            <span className="font-medium label-text">Pay on Delievery</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-amber-500"
              checked={payment === 'cod'}
              onChange={(e) => setPayment(e.target.checked ? 'cod' : 'online')}
            />
          </label>
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={() => navigate(-1)} type="button" variant="outlined" fullWidth>
            Back
          </Button>
          <Button onClick={() => handlePayment()} type="submit" fullWidth>
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Payment
