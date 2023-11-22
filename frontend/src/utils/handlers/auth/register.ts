import { Response } from '../../../types/Response'
import { User } from '../../../types/User'
import { REGISTER_USER } from '../../endpoints'
import { httpClient } from '../../httpClient'

type RegisterRequest = {
  name: string
  email: string
  password: string
}

type RegisterResponse = Response<User>

const register = async (args: RegisterRequest) => {
  const res = await httpClient.post<RegisterResponse>(REGISTER_USER, args)
  const data = res.data
  return data
}

export default register
