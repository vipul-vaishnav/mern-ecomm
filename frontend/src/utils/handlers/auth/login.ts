import { Response } from '../../../types/Response'
import { User } from '../../../types/User'
import { LOGIN_USER } from '../../endpoints'
import { httpClient } from '../../httpClient'

type LoginRequest = {
  email: string
  password: string
}

type LoginResponse = Response<User>

const login = async (args: LoginRequest) => {
  const res = await httpClient.post<LoginResponse>(LOGIN_USER, args)
  const data = res.data
  return data
}

export default login
