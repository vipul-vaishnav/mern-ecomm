import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getOrders } from '../utils/handlers/order/getOrders'

type OrdersProps = Record<string, string>

const Orders: React.FC<OrdersProps> = () => {
  const [key, func] = getOrders()
  const { data, isLoading, isError } = useQuery(key, func)

  return (
    <div className="max-w-screen-lg mx-auto my-12">
      <h1 className="text-3xl font-semibold">Your Orders</h1>

      <div>
        {isLoading ? (
          <div className="my-12 text-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : isError ? (
          <>Error</>
        ) : (
          <div className="my-12">
            {data.data.length <= 0 ? (
              <>No orders</>
            ) : (
              data.data.map((order, idx) => {
                return (
                  <div key={idx} className="p-4 my-4 rounded shadow-lg">
                    <p className="mb-2 text-xl font-bold">{order._id}</p>
                    <p>{new Date(order.createdAt).toLocaleDateString('en-In')}</p>
                    <div className="flex flex-col items-start gap-3 my-4">
                      <p>
                        <strong>Payment</strong> -{' '}
                        <span>{order.isPaid ? 'Paid' : 'Pay on delivery'}</span>
                      </p>
                      <p>
                        <strong>Delivered</strong> -{' '}
                        <span>{order.isDeliverd ? 'Order on its way' : 'Order Delivered'}</span>
                      </p>
                      <div>
                        <p className="font-semibold">{order.shippingAddress.address}</p>
                        <p>{order.shippingAddress.city}</p>
                        <p>{order.shippingAddress.postalCode}</p>
                        <p>{order.shippingAddress.state}</p>
                      </div>
                      <div className="my-4">
                        {order.orderItems.map((item) => {
                          return (
                            <div key={item.product.id} className="flex items-center gap-6 my-2 ">
                              <div>
                                <img src={item.product.image} alt={item.product.title} width={24} />
                              </div>
                              <span className="font-medium">{item.product.title}</span> Qty. -{' '}
                              {item.qty}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default Orders
