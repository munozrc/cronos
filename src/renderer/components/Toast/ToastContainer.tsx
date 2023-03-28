import { useCallback, useEffect, useState } from "react"
import { type ToastContent, type Toast, TOAST_EVENTS } from "@/types"
import { ToastComponent } from "./ToastComponent"
import styles from "./ToastContainer.module.css"

export const ToastContainer: React.FC = () => {
  const [toastList, setToastList] = useState<Toast[]>([])

  const createToast = useCallback((e: CustomEvent<ToastContent>) => {
    const toast: Toast = {
      id: window.crypto.randomUUID(),
      content: e.detail,
      state: "pending"
    }
    setToastList(prev => ([...prev, toast]))
  }, []) as EventListener

  useEffect(() => {
    window.addEventListener(TOAST_EVENTS.CREATE, createToast)
    return () => {
      window.removeEventListener(TOAST_EVENTS.CREATE, createToast)
    }
  }, [createToast])

  return (
    <div className={styles.container}>
      {toastList.map(({ id, state, content }) => (
        <ToastComponent
          key={id}
          state={state}
          content={content}
        />
      ))}
    </div>
  )
}
