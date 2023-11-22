import { createContext, useEffect, useState } from 'react'
import { User } from '../types/User'

export type UserContextType = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {}
})

type Props = {
  children: React.ReactNode
}

const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const value = localStorage.getItem('pro_shop_user')
    if (value) {
      setUser(JSON.parse(value) as User)
    } else {
      setUser(null)
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
