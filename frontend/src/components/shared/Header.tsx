import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import Button from './Button'
import { useCartStore } from '../../store/store'

import { UserContext } from '../../context/UserContext'

import { httpClient } from '../../utils/httpClient'
import { LOGOUT_USER } from '../../utils/endpoints'
import { LocalStorage } from '../../utils/LocalStorage'

type HeaderProps = Record<string, string>

const Header: React.FC<HeaderProps> = () => {
  const { items } = useCartStore()
  const navigate = useNavigate()
  const goToCart = () => navigate('/cart')
  const { user, setUser } = useContext(UserContext)

  const getItemsQty = items.reduce((a, c) => a + c.qty, 0)
  const totalPrice = items.map((item) => item.product.price * item.qty).reduce((a, c) => a + c, 0)

  const handleLogout = async () => {
    try {
      const res = await httpClient.post<{ message: string }>(LOGOUT_USER)
      toast.success(res.data.message)
      LocalStorage.remove('pro_shop_user')
      setUser(null)
    } catch (err) {
      if (err instanceof AxiosError) toast.error(err.response?.data.message)
      else if (err instanceof Error) toast.error(err.message)
      else toast.error('Logging out Failed')
    } finally {
      navigate('/')
    }
  }

  return (
    <React.Fragment>
      <div className="px-5 shadow-lg navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="text-xl normal-case">
            🛒 ProShop.
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {getItemsQty > 0 && (
                  <span className="badge badge-sm indicator-item">{getItemsQty}</span>
                )}
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">{getItemsQty} Items</span>
                <span className="text-info">Subtotal: ${totalPrice.toFixed(2)}</span>
                <div className="card-actions">
                  <Button fullWidth onClick={goToCart}>
                    View cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="/user.webp" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">{user.name}</a>
                </li>
                <li>
                  <Link to="/orders" className="justify-between">
                    My Orders
                  </Link>
                </li>
                <li>
                  <span onClick={handleLogout}>Logout</span>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}
export default Header
