import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from './../components/shared/Button'
import { useCartStore } from '../store/store'
import { UserContext } from '../context/UserContext'

type CartProps = Record<string, string>

const Cart: React.FC<CartProps> = () => {
  const { clearCart, items, deleteItemFromCart, decrementQty, incrementQty } = useCartStore()
  const navigate = useNavigate()

  const { user } = useContext(UserContext)

  const getTotalAmount = () =>
    items.map((item) => item.product.price * item.qty).reduce((acc, curr) => acc + curr, 0)

  const handleBack = () => navigate(-1)

  const handleDelete = (id: number) => deleteItemFromCart(id)

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=/cart')
    } else {
      navigate('/shipping')
    }
  }

  return (
    <React.Fragment>
      <section className="max-w-screen-xl mx-auto my-12">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold lg:text-4xl sm:text-3xl">Your Cart</h1>
          <Button onClick={handleBack} variant="link" classes="flex items-center gap-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            Go Back
          </Button>
        </div>

        <div className="my-6 mb-0 border-b-2 border-orange-200">
          <div className="flex items-center justify-between gap-6 p-5 text-orange-400">
            <h2 className="flex-1">Product</h2>
            <div className="grid w-full max-w-md grid-cols-5 gap-5">
              <h3>Quantity</h3>
              <h3>Price</h3>
              <h3>Qty X Price</h3>
              <h3></h3>
              <h3></h3>
            </div>
          </div>
        </div>

        <div>
          {items.map((x, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-6 p-5 border-b-2 border-orange-200"
            >
              <div className="flex items-center flex-1 gap-5">
                <img src={x.product.image} alt={x.product.title} width={42} />
                <h6 className="font-semibold">{x.product.title}</h6>
              </div>
              <div className="grid w-full max-w-md grid-cols-5 gap-5">
                <p>{x.qty}</p>
                <p>${x.product.price}</p>
                <p>${x.product.price * x.qty}</p>
                <div className="flex items-center gap-3">
                  <Button variant="link" onClick={() => decrementQty(x.product.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                  <span className="text-lg">{x.qty}</span>
                  <Button variant="link" onClick={() => incrementQty(x.product.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </div>
                <Button onClick={() => handleDelete(x.product.id)} variant="link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 mb-8">
          Total: <strong>${getTotalAmount().toFixed(2)}</strong>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleCheckout}>Checkout</Button>
          <Button variant="outlined" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
      </section>
    </React.Fragment>
  )
}
export default Cart
