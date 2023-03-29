export const TOAST_EVENTS = {
  CREATE: "toast-create",
  UPDATE: "toast-update",
  REMOVE: "toast-remove"
}

export type ToastState = "pending" | "success" | "error"
export type ToastID = string
export type ToastContent = string

export interface Toast {
  id: ToastID
  state: ToastState
  content: ToastContent
}

export interface CreateToastEvent {
  id: ToastID
  content: ToastContent
}

export interface UpdateToastEvent {
  id: ToastID
  state: ToastState
}
