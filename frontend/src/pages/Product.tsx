import axios from 'axios'
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { type Product } from '../types/Product'
import Button from '../components/shared/Button'
import { useCartStore } from '../store/store'

type ProductProps = Record<string, never>

const Product: React.FC<ProductProps> = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  const { addNewItem } = useCartStore()

  const handleQty = (type: 'inc' | 'dec') => {
    if (type === 'inc') {
      if (qty === 6) {
        toast.error('Maximum Quantity Reached')
        return
      }
      setQty((prevState) => prevState + 1)
    } else {
      if (qty === 1) {
        toast.error('Minimum Quantity Must Be 1')
        return
      }
      setQty((prevState) => prevState - 1)
    }
  }

  const handleBack = () => navigate(-1)

  const getProducts = async () => {
    const res = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`)
    const data = res.data
    return data
  }

  const { data, isLoading, isError, error } = useQuery(['product', id], getProducts)

  const fullStarsCount = Math.floor(data?.rating.rate || 0)
  const rem = Math.round((data?.rating.rate || 0) - fullStarsCount)

  if (isError) {
    return <>Error: {error}</>
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <div className="my-12 text-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <section>
          <div className="my-12">
            <Button onClick={handleBack} variant="link" classes="flex items-center gap-5">
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

          <div className="grid grid-cols-1 gap-8 my-12 lg:grid-cols-2">
            <div className="w-full bg-orange-50 h-full max-h-96 flex items-center justify-center min-h-[300px] rounded-xl shadow-sm">
              <img
                src={data.image}
                alt={data.title}
                className="object-cover w-full h-auto max-w-[240px] mx-auto"
              />
            </div>
            <div>
              <h2 className="mb-4 text-xl font-bold sm:text-3xl">{data.title}</h2>
              <h6 className="mb-4 text-xl font-semibold">Price: ${data.price}</h6>
              <p>
                <span className="underline">Description:</span>
                <br />
                {data.description}
              </p>
              <div className="divider"></div>
              <div>
                <h6 className="text-xl font-semibold">Reviews</h6>
                <div className="flex items-center gap-5">
                  <p className="font-medium">
                    {data.rating.rate} ({data.rating.count})
                  </p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: fullStarsCount }).map((_, idx) => {
                      return <img key={idx} src={'/images/full-star.png'} alt="star" width="28" />
                    })}
                    {Array.from({ length: rem }).map((_, idx) => {
                      return <img key={idx} src={'/images/half-star.png'} alt="star" width="28" />
                    })}
                  </div>
                </div>
              </div>
              <div className="divider"></div>
              <div className="flex items-center gap-3">
                {true ? (
                  <div className="gap-2 badge badge-success">In Stock</div>
                ) : (
                  <div className="gap-2 badge badge-error">Out of stock</div>
                )}
                {true && <div className="gap-2 badge badge-info">New</div>}
              </div>
              <div className="divider"></div>
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-3">
                  <Button variant="outlined" onClick={() => handleQty('inc')}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                  <span className="text-xl">{qty}</span>
                  <Button variant="outlined" onClick={() => handleQty('dec')}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </div>
                <Button
                  onClick={() =>
                    addNewItem({
                      product: data,
                      qty: qty
                    })
                  }
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  )
}
export default Product
