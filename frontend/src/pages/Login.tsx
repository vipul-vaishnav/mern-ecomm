import React, { FormEvent, useContext, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'

import Button from '../components/shared/Button'
import login from '../utils/handlers/auth/login'
import { LocalStorage } from '../utils/LocalStorage'
import { UserContext } from '../context/UserContext'

const Login: React.FC = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const foo = useSearchParams()
  const redirect = foo[0].get('redirect')

  const { setUser } = useContext(UserContext)

  const navigate = useNavigate()

  const { email, password } = values

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      LocalStorage.set('pro_shop_user', data.data)
      setUser(data.data)
      toast.success(data.message)
      if (redirect) navigate(redirect)
      else navigate('/')
    },
    onError: (err) => {
      if (err instanceof AxiosError) toast.error(err.response?.data.message)
      else if (err instanceof Error) toast.error(err.message)
      else toast.error('Login Failed')
    }
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginMutation.mutate(values)
  }

  return (
    <React.Fragment>
      <div className="min-h-[480px] my-6 rounded-md overflow-auto grid md:grid-cols-2 grid-cols-1 gap-20">
        <div>
          <h1 className="mb-6 text-2xl font-bold">
            Welcome to <span className="text-orange-400">Proshop</span>
          </h1>
          <p>Enter details to login to your account</p>

          <div className="p-5 my-6 bg-orange-50 bg-opacity-40 rounded-xl mt-14">
            <h6 className="mb-6 text-xl font-bold text-center">Login</h6>
            <form onSubmit={handleSubmit}>
              <div className="w-full my-4">
                <input
                  value={email}
                  onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
                  type="email"
                  placeholder="Enter email"
                  className="w-full input input-bordered"
                  autoComplete="off"
                />
              </div>
              <div className="w-full my-4">
                <input
                  value={password}
                  onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))}
                  type="password"
                  placeholder="Enter password"
                  className="w-full input input-bordered"
                  autoComplete="off"
                />
              </div>
              <div className="my-4">
                <Button
                  loading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                  fullWidth
                >
                  <div className="flex items-center justify-center gap-6">
                    Login
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </Button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <span>Don't have an accout?</span>{' '}
              <Link
                to={redirect ? '/register?redirect=' + redirect : '/register'}
                className="font-bold text-orange-400"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
        <div className="items-center justify-center hidden w-full h-full bg-orange-100 md:flex">
          <div className="max-w-[360px] mx-auto">
            <h6 className="mb-6 text-xl font-bold">Easy, Fast and Reliable</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias distinctio unde
              blanditiis ut repudiandae nisi facere necessitatibus nam eum architecto.
            </p>

            <p className="grid w-64 mx-auto text-center bg-orange-400 rounded-full text-9xl aspect-square place-content-center">
              🚀
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Login
