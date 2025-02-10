import cachedFetcher from './cached-fetcher'
import fetcher from './fetcher'
import type { FetchConfig, Done } from './types'

const options: FetchConfig = {
  cache: false,
  revalidate: true,
  skip: false,
  refetch: false,
  timeout: 60 * 1000,
  body: null,
  method: 'GET',
  headers: {},
  router: null,
}

export default async function useFetch<T = Record<string, unknown>>(
  url: string,
  config?: FetchConfig,
  done?: Done<T>,
) {
  config = {
    ...options,
    ...config,
  }
  if (config.cache) {
    const res = await cachedFetcher(url, config, done)
    return res
  }
  const res = await fetcher<T>(url, config, done)
  return {
    ...res,
    clearCache: () => {},
  }
}

export { createError } from './fetch-error'
export { fetchErrorHandler } from './fetch-error'

export { type FetchConfig } from './types'
export { type FetchError } from './types'
export { type Done } from './types'
