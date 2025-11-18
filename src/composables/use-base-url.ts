type ServiceKey = 'user' | 'search'

export function useBaseUrl(serviceKey: ServiceKey): string {
  const urls = {
    user: import.meta.env.VITE_API_URL_MS_USER,
    search: import.meta.env.VITE_API_URL_MS_SEARCH,
  }

  return (
    urls[serviceKey] ??
    (() => {
      console.warn(`Base URL didn't find: "${serviceKey}"`)
      return ''
    })()
  )
}
