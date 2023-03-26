import { type ReactNode } from "react"
import styles from "./Toast.module.css"

const stateTitle = {
  pending: "Pendiente",
  success: "Completado",
  error: "Error"
}

interface ToastProps {
  state: "pending" | "success" | "error"
  children: ReactNode
}

export const Toast: React.FC<ToastProps> = ({ state, children }) => (
  <div className={styles.container}>
    <h4 className={`${styles.title} ${styles[state]}`}>{stateTitle[state]}</h4>
    <p className={styles.content}>{children}</p>
  </div>
)
