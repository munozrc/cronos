import { useCallback, useEffect, useState } from "react"
import { type Toast, TOAST_EVENTS, type ToastID, type CreateToastEvent } from "@/types"
import { ToastComponent } from "./ToastComponent"
import styles from "./ToastContainer.module.css"

export const ToastContainer: React.FC = () => {
  const [toastList, setToastList] = useState<Toast[]>([])

  const createToast = useCallback((e: CustomEvent<CreateToastEvent>) => {
    const { id, content } = e.detail
    const toast: Toast = { id, content, state: "pending" }
    setToastList(prev => ([...prev, toast]))
  }, []) as EventListener

  const updateToast = useCallback((e: CustomEvent<ToastID>) => {
    setToastList(prev => {
      const toast = prev.find(t => t.id === e.detail)
      const list = prev.filter(t => t.id !== e.detail)
      if (typeof toast === "undefined") return prev
      return [...list, { ...toast, state: "success" }]
    })
  }, []) as EventListener

  const removeToast = useCallback((e: CustomEvent<ToastID>) => {
    const id = e.detail
    setToastList(prev => prev.filter(t => t.id !== id))
  }, []) as EventListener

  useEffect(() => {
    window.addEventListener(TOAST_EVENTS.CREATE, createToast)
    window.addEventListener(TOAST_EVENTS.UPDATE, updateToast)
    window.addEventListener(TOAST_EVENTS.REMOVE, removeToast)

    return () => {
      window.removeEventListener(TOAST_EVENTS.CREATE, createToast)
      window.removeEventListener(TOAST_EVENTS.UPDATE, updateToast)
      window.removeEventListener(TOAST_EVENTS.REMOVE, removeToast)
    }
  }, [createToast, updateToast, removeToast])

  return (
    <div className={styles.container}>
      {toastList.map(({ id, state, content }) => (
        <ToastComponent
          key={id}
          id={id}
          state={state}
          content={content}
        />
      ))}
    </div>
  )
}
