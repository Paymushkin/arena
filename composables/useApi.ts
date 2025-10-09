/**
 * Composable для работы с API
 */

import type { UseFetchOptions } from 'nuxt/app'
import { API_BASE_URL, TIMEOUTS } from '~/constants'

export const useApi = <T>(url: string, options?: UseFetchOptions<T>) => {
  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: (config.public.apiBase as string) || API_BASE_URL,
    timeout: TIMEOUTS.API_REQUEST,

    // Обработка ошибок
    onResponseError({ response }) {
      console.error('API Error:', response._data)
    },

    // Добавление заголовков
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // Объединяем дефолтные опции с переданными
  const params = { ...defaults, ...options }

  return useFetch(url, params)
}

/**
 * POST запрос
 */
export const useApiPost = <T>(url: string, body?: any, options?: UseFetchOptions<T>) => {
  return useApi<T>(url, {
    method: 'POST',
    body,
    ...options
  })
}

/**
 * PUT запрос
 */
export const useApiPut = <T>(url: string, body?: any, options?: UseFetchOptions<T>) => {
  return useApi<T>(url, {
    method: 'PUT',
    body,
    ...options
  })
}

/**
 * DELETE запрос
 */
export const useApiDelete = <T>(url: string, options?: UseFetchOptions<T>) => {
  return useApi<T>(url, {
    method: 'DELETE',
    ...options
  })
}
