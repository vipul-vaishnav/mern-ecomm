import { API_TEST } from '../endpoints'
import { httpClient } from '../httpClient'
import { QueryKey } from '@tanstack/react-query'

type TestApiResponse = {
  status: 'OK'
  message: string
}

export const getTestApiKeyandFunc = (): Readonly<[QueryKey, () => Promise<TestApiResponse>]> => {
  const queryKey = ['test']
  const queryFunc = async () => {
    const res = await httpClient.get<TestApiResponse>(API_TEST)
    const data = res.data
    return data
  }

  return [queryKey, queryFunc] as const
}
