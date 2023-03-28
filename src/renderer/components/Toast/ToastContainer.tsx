import { type Toast } from "@/global"
import { useEffect, useState } from "react"
import { ToastComponent } from "./ToastComponent"
import styles from "./ToastContainer.module.css"

export const ToastContainer: React.FC = () => {
  const [toastList, setToastList] = useState<Toast[]>([])

  useEffect(() => {
    const createToast = (e: CustomEvent<string>): void => {
      setToastList(prev => ([
        ...prev,
        {
          id: window.crypto.randomUUID(),
          content: e.detail,
          state: "pending"
        }
      ]))
    }

    window.addEventListener("createtoast", createToast as EventListener)
    return () => {
      window.removeEventListener("createtoast", createToast as EventListener)
    }
  })

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
