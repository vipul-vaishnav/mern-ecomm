import { QueryKey } from '@tanstack/react-query'
import { httpClient } from '../../httpClient'
import { USER_ROUTES } from '../../endpoints'
import { Response } from '../../../types/Response'
import { User } from '../../../types/User'

export const getUser = (): [QueryKey, () => Promise<Response<User>>] => {
  const key = ['ProShopUser']
  const func = async () => {
    const res = await httpClient.get<Response<User>>(USER_ROUTES)
    const data = res.data
    return data
  }
  return [key, func] as const
}
