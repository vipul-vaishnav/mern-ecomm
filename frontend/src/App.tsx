import React from 'react'
import { Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import Container from './components/shared/Container'

import UserContextProvider from './context/UserContext'

import { getTestApiKeyandFunc } from './utils/handlers/testApi'

const App: React.FC = (): React.ReactElement => {
  const [key, func] = getTestApiKeyandFunc()
  const { data } = useQuery({ queryKey: key, queryFn: func })
  console.log(data?.message)

  return (
    <React.Fragment>
      <UserContextProvider>
        <Toaster />
        <main className="min-h-screen overflow-x-hidden text-base font-normal leading-normal text-gray-900 bg-white font-default">
          <Header />
          <Container>
            <Outlet />
          </Container>
          <Footer />
        </main>
      </UserContextProvider>
    </React.Fragment>
  )
}
export default App
