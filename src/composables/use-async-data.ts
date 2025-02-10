import type { Ref } from 'vue'
import type { FetchConfig, FetchError } from './use-fetch'
import useFetch from './use-fetch'

export interface AsyncDataParams<T> {
  api: string
  options: AsyncDataOptions
  onSuccess?: AsyncDataSuccessHandler<T>
}

export interface AsyncDataOptions {
  loading: Ref<boolean>
  allLoaded?: Ref<boolean>
  success?: Ref<boolean>
  error: Ref<FetchError | null>
  config?: FetchConfig
}

export type AsyncDataSuccessHandler<T> = (data: T) => void | Promise<void>

const useAsyncData = async <T>(
  api: string,
  { loading, error, success, allLoaded, config }: AsyncDataOptions,
  onSuccess?: AsyncDataSuccessHandler<T>,
): Promise<T | null> => {
  error.value = null

  // Handle allLoaded check
  if (allLoaded?.value) {
    return null
  }

  loading.value = true
  if (success) success.value = false

  // Fetch data
  const { data, error: fetchError } = await useFetch<T>(api, config || {})
  loading.value = false

  // Handle errors
  if (fetchError.value) {
    error.value = fetchError.value
    return null
  }

  // Handle missing data
  if (!data.value) {
    return null
  }

  if (success) success.value = true

  // Execute success handler
  if (onSuccess) {
    await onSuccess(data.value)
  }

  return data.value
}

export default useAsyncData
