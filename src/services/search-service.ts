import { useBaseUrl } from '@/composables/use-base-url.ts'
import { useService } from '@/composables/use-service.ts'

import type { SearchFormResponse } from '@/utils/search'
import type { Ref } from 'vue'

type Payload = {
  pagination: Pagination
}
type Pagination = {
  page: number
  recordsByPage: number
}

interface GeneralResponse {
  data: object
  erros: string[]
  infos: string[]
  successes: string[]
}

const baseUrlSearch = useBaseUrl('search')

export function fetchSearchesAsync() {
  const service = useService()
  const { loading, error, data } = service

  const payload: Payload = { pagination: { page: 1, recordsByPage: 10 } }

  type PostFn = <TResp = unknown, TBody = unknown>(url: string, body?: TBody) => Promise<TResp>

  const post = (service as unknown as { post: PostFn }).post

  const callback = () => post<unknown, Payload>(`${baseUrlSearch}/SearchEndpoint/ListAll`, payload)

  return { callback, loading, error, data }
}

export function getSearchByIdAsync(searchId: string) {
  const service = useService()
  const { loading, error, data } = service

  type PostFn = <TResp = unknown, TBody = unknown>(url: string, body?: TBody) => Promise<TResp>
  const post = (service as unknown as { post: PostFn }).post

  const callback = () =>
    post<unknown>(`${baseUrlSearch}/SearchEndpoint/GetSearchById?searchId=${searchId}`)

  return { callback, loading, error, data }
}

export function createSearchAsync(payload: SearchFormResponse) {
  const service = useService()
  const { loading, error, data } = service

  type PostFn = <TResp = GeneralResponse, TBody = unknown>(
    url: string,
    body?: TBody
  ) => Promise<TResp>
  const post = (service as unknown as { post: PostFn }).post

  const callback = () =>
    post<GeneralResponse, SearchFormResponse>(`${baseUrlSearch}/SearchEndpoint/Insert`, payload)

  return { callback, loading, error, data: data as Ref<GeneralResponse | null> }
}

export function editSearchAsync(payload: SearchFormResponse) {
  const service = useService()
  const { loading, error, data } = service

  type PostFn = <TResp = unknown, TBody = unknown>(url: string, body?: TBody) => Promise<TResp>
  const post = (service as unknown as { post: PostFn }).post

  const callback = () =>
    post<unknown, SearchFormResponse>(`${baseUrlSearch}/SearchEndpoint/Edit`, payload)

  return { callback, loading, error, data: data as Ref<GeneralResponse | null> }
}

export function deleteSearchByIdAsync(searchId: string) {
  const service = useService()
  const { loading, error, data, del } = service

  const callback = () => del<unknown>(`${baseUrlSearch}/SearchEndpoint/Remove?searchId=${searchId}`)

  return { callback, loading, error, data }
}
