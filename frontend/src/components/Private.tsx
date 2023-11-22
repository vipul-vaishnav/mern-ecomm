import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Private: React.FC = (): React.ReactElement => {
  const { user } = useContext(UserContext)

  return user ? <Outlet /> : <Navigate to="/" replace />
}

export default Private
