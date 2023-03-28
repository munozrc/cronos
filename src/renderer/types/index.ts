export const TOAST_EVENTS = {
  CREATE: "toast-create"
}

export type ToastState = "pending" | "success" | "error"
export type ToastID = string
export type ToastContent = string

export interface Toast {
  id: ToastID
  state: ToastState
  content: string
}
