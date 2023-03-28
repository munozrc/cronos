import type { ToastContent, ToastState } from "@/types"
import styles from "./Toast.module.css"

interface ToastProps {
  state: ToastState
  content: ToastContent
}

const stateTitle = {
  pending: "Pendiente",
  success: "Completado",
  error: "Error"
}

export const ToastComponent: React.FC<ToastProps> = ({ state, content }) => (
  <div className={styles.container}>
    <h4 className={`${styles.title} ${styles[state]}`}>{stateTitle[state]}</h4>
    <p className={styles.content}>{content}</p>
  </div>
)
