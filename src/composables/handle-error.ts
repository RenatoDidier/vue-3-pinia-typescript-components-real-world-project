// errors.ts
import axios, { AxiosError } from 'axios'

type ApiErrorResponse =
  | { errors?: string[]; message?: string; detail?: string }
  | string
  | undefined

export function extractErrorMessage(exception: unknown): string {
  if (axios.isAxiosError(exception)) {
    const axErr = exception as AxiosError<ApiErrorResponse>
    const data = axErr.response?.data

    if (typeof data === 'string' && data.trim()) return data
    if (data && typeof data === 'object') {
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        return data.errors[0]!
      }
      if (data.message) return data.message
      if (data.detail) return data.detail
    }
    return axErr.response?.statusText || axErr.message || 'Network error connection.'
  }

  if (exception instanceof Error) return exception.message

  return 'An unexpected error has occurred. Please contact those responsible.'
}
