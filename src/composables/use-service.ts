import { ref, onUnmounted } from 'vue'
import axios, { AxiosError, CanceledError } from 'axios'

import type { AxiosRequestConfig, AxiosResponse } from 'axios'

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export function useService<TData = unknown>() {
  const loading = ref(false)
  const error = ref<AxiosError | Error | null>(null)
  const data = ref<TData | null>(null)

  const apiKey = import.meta.env.VITE_API_KEY as string | undefined

  let abortController: AbortController | null = null

  async function request<TResp = TData, TBody = unknown>(
    method: HttpMethod,
    url: string,
    payload?: TBody,
    config: AxiosRequestConfig<TBody> = {}
  ): Promise<AxiosResponse<TResp> | undefined> {
    loading.value = true
    error.value = null
    data.value = null

    abortController?.abort()
    abortController = new AbortController()

    try {
      const response = await axios.request<TResp, AxiosResponse<TResp>, TBody>({
        method,
        url,
        data: payload,
        signal: abortController.signal,
        headers: {
          'BackOffice-Api-Key': apiKey,
          ...(config.headers ?? {}),
        },
        ...config,
      })

      data.value = response.data as unknown as TData
      return response
    } catch (err) {
      if (err instanceof CanceledError || axios.isCancel(err)) {
        return undefined
      }
      error.value = err as AxiosError
      throw err
    } finally {
      loading.value = false
    }
  }

  const get = <TResp = TData>(url: string, config?: AxiosRequestConfig) =>
    request<TResp>('get', url, undefined as never, config)

  const post = <TResp = TData, TBody = unknown>(
    url: string,
    payload?: TBody,
    config?: AxiosRequestConfig<TBody>
  ) => request<TResp, TBody>('post', url, payload, config)

  const put = <TResp = TData, TBody = unknown>(
    url: string,
    payload?: TBody,
    config?: AxiosRequestConfig<TBody>
  ) => request<TResp, TBody>('put', url, payload, config)

  const del = <TResp = TData>(url: string, config?: AxiosRequestConfig) =>
    request<TResp>('delete', url, undefined as never, config)

  onUnmounted(() => {
    abortController?.abort()
  })

  return { get, post, put, del, loading, error, data }
}
