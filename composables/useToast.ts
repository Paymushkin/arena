/**
 * Composable для уведомлений (Toast)
 */

import { TIMEOUTS } from '~/constants'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

const toasts = ref<Toast[]>([])

export const useToast = () => {
  const show = (message: string, type: ToastType = 'info', duration?: number) => {
    const toastDuration = duration || TIMEOUTS.TOAST_MESSAGE
    const id = Math.random().toString(36).substring(2, 15)

    const toast: Toast = {
      id,
      type,
      message,
      duration
    }

    toasts.value.push(toast)

    // Автоматическое удаление
    setTimeout(() => {
      remove(id)
    }, toastDuration)

    return id
  }

  const remove = (id: string) => {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (message: string, duration?: number) => {
    return show(message, 'success', duration)
  }

  const error = (message: string, duration?: number) => {
    return show(message, 'error', duration)
  }

  const warning = (message: string, duration?: number) => {
    return show(message, 'warning', duration)
  }

  const info = (message: string, duration?: number) => {
    return show(message, 'info', duration)
  }

  return {
    toasts: readonly(toasts),
    show,
    remove,
    success,
    error,
    warning,
    info
  }
}
