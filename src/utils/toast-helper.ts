import { useToast } from 'primevue/usetoast'

export type ToastSeverity = 'success' | 'info' | 'warn' | 'error'

export interface NotifyOpts {
  title?: string
  message?: string
  life?: number
}

export function useNotify(defaults?: Partial<NotifyOpts>) {
  const toast = useToast()

  const showToast = (severity: ToastSeverity, opts: NotifyOpts) => {
    const { title, message, life = 3500 } = { ...defaults, ...opts }
    toast.add({
      severity,
      summary: title,
      detail: message,
      life,
    })
  }

  return {
    showToast,
    success: (opts: NotifyOpts | string) =>
      showToast('success', typeof opts === 'string' ? { title: 'Success', message: opts } : opts),
    info: (opts: NotifyOpts | string) =>
      showToast('info', typeof opts === 'string' ? { title: 'Attention', message: opts } : opts),
    warn: (opts: NotifyOpts | string) =>
      showToast('warn', typeof opts === 'string' ? { title: 'Attention', message: opts } : opts),
    error: (opts: NotifyOpts | string) =>
      showToast('error', typeof opts === 'string' ? { title: 'Error', message: opts } : opts),
  }
}
