import { type ToastContent, TOAST_EVENTS } from "@/types"
import { useCallback } from "react"

interface ReturnType {
  createToast: (content: ToastContent) => string
  updateToast: (id: string) => void
  removeToast: (id: string) => void
}

export function useToast (): ReturnType {
  const createToast = useCallback((content: ToastContent): string => {
    const id = window.crypto.randomUUID()
    const detail = { id, content }
    const toastEvent = new CustomEvent(TOAST_EVENTS.CREATE, { detail })
    window.dispatchEvent(toastEvent)
    return id
  }, [])

  const updateToast = useCallback((id: string) => {
    const toastEvent = new CustomEvent(TOAST_EVENTS.UPDATE, { detail: id })
    window.dispatchEvent(toastEvent)
  }, [])

  const removeToast = useCallback((id: string) => {
    const toastEvent = new CustomEvent(TOAST_EVENTS.REMOVE, { detail: id })
    window.dispatchEvent(toastEvent)
  }, [])

  return {
    createToast,
    updateToast,
    removeToast
  }
}
