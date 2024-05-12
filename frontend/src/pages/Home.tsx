import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { Product } from '../types/Product'

import Button from '../components/shared/Button'

import { CartState, useCartStore } from '../store/store'

import { LOCAL_STORAGE_KEY, LocalStorage } from '../utils/LocalStorage'

type HomeProps = Record<string, string>

const Home: React.FC<HomeProps> = () => {
  const cartItems = useCartStore((s) => s.items)
  const addToCart = useCartStore((s) => s.addNewItem)

  const handleBuyNow = (item: Product) => {
    addToCart({
      product: item
    })
  }

  useEffect(() => {
    LocalStorage.set<CartState['items']>(LOCAL_STORAGE_KEY, cartItems)
  }, [cartItems])

  const getProducts = async () => {
    const res = await axios.get<Product[]>('https://fakestoreapi.com/products')
    const data = res.data
    return data
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts()
  })

  if (isError) {
    return <>Error {error}</>
  }

  return (
    <section>
      <h1 className="my-12 text-2xl font-bold text-center text-gray-700">Featured Products New</h1>

      <div>
        {/* <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quibusdam eius
          recusandae harum atque maiores quia tempora iure quaerat corporis alias sint dicta dolorem
          illo aspernatur tempore, nesciunt at sequi voluptate corrupti quas doloribus enim
          consequuntur ut. Provident, cumque ducimus!
        </div> */}

        <div>
          {isLoading ? (
            <div className="my-12 text-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 my-12 md:grid-cols-2 lg:grid-cols-4">
              {data.map((item, idx) => {
                return (
                  <div key={idx} className="w-full overflow-hidden shadow-xl card bg-base-100">
                    <Link
                      to={`/product/${item.id}`}
                      className="bg-orange-50 min-h-[240px] flex items-center justify-center"
                    >
                      <figure className="w-[150px] h-auto mx-auto">
                        <img src={item.image} alt={item.title} className="object-cover" />
                      </figure>
                    </Link>
                    <div className="card-body">
                      <h2 className="card-title">{item.title}</h2>
                      <p>{item.description.slice(0, 100)}...</p>
                      <div className="justify-between card-actions">
                        <span>${item.price.toFixed(2)}</span>
                        <Button onClick={() => handleBuyNow(item)}>Buy Now</Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Home
