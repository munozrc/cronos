import { type ToastContent, TOAST_EVENTS } from "@/types"
import { useCallback } from "react"

interface ReturnType {
  createToast: (content: ToastContent) => void
}

export function useToast (): ReturnType {
  const createToast = useCallback((content: ToastContent) => {
    const toastEvent = new CustomEvent(TOAST_EVENTS.CREATE, { detail: content })
    window.dispatchEvent(toastEvent)
  }, [])

  return {
    createToast
  }
}
