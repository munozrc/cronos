import { Toast } from "./Toast"
import styles from "./ToastContainer.module.css"

export const ToastContainer: React.FC = () => {
  return (
    <div className={styles.container}>
      <Toast state="success">Last Christmas - Wham!</Toast>
      <Toast state="pending">Last Christmas - Wham!</Toast>
    </div>
  )
}
