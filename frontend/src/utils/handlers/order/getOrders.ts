import { QueryKey } from '@tanstack/react-query'
import { httpClient } from '../../httpClient'
import { Order } from './createOrder'
import { Response } from '../../../types/Response'
import { GET_MY_ORDERS } from '../../endpoints'

export const getOrders = (): Readonly<[QueryKey, () => Promise<Response<Order[]>>]> => {
  const queryKey = ['orders']
  const queryFunc = async () => {
    const res = await httpClient.get<Response<Order[]>>(GET_MY_ORDERS)
    const data = res.data
    return data
  }

  return [queryKey, queryFunc] as const
}
