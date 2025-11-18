import { ref } from 'vue'

let seed = 0

export function useUniqueId(prefix = 'uid-') {
  const id = ref<string>('')

  if (!id.value) {
    const rand =
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}-${++seed}`

    id.value = `${prefix}${String(rand)}`.toLowerCase().replace(/[^a-z0-9\-]/g, '')
  }

  return id
}
