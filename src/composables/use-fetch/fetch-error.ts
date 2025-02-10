import { type FetchError } from '.'
import { type Router } from 'vue-router'

interface ErrorCreatorOptions {
  code?: string
  message: string
  name?: string
  status: number
}

export const createError = (options: ErrorCreatorOptions) => {
  const error: FetchError = new Error(options.message)
  error.status = options.status
  if (options.name) error.name = options.name
  if (options.code) error.code = options.code
  return error
}

export const fetchErrorHandler = (error: FetchError | null, router: Router) => {
  if (!error) {
    return null
  }
  if (error.status === 404) {
    router.push({ name: 'error-404' })
    return error
  }
  if (error.name === 'AbortError') {
    return new Error('That took too long. Check your internet connection and try again.')
  }
  return error
}
