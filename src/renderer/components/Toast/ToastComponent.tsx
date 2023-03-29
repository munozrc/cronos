import { useCallback, useEffect, useRef } from "react"
import type { Toast } from "@/types"
import { useToast } from "@/hooks"

import styles from "./ToastComponent.module.css"
import { Button } from "../Button"
import { CloseIcon } from "../Icons"

const stateTitle = {
  pending: "Pendiente",
  success: "Completado",
  error: "Error"
}

export const ToastComponent: React.FC<Toast> = ({ id, state, content }) => {
  const refTimer = useRef<number | null>(null)
  const { removeToast } = useToast()

  const startTimer = useCallback((): void => {
    if (refTimer.current !== null) return
    refTimer.current = window.setTimeout(() => {
      removeToast(id)
    }, 5000)
  }, [id, removeToast])

  const handleClose = (): void => {
    removeToast(id)
  }

  useEffect(() => {
    if (state !== "pending") {
      startTimer()
      console.log("Timer Start ---> ", content)
    }

    return () => {
      if (refTimer.current === null) return
      window.clearTimeout(refTimer.current)
    }
  }, [state, content, startTimer])

  return (
    <div className={styles.container}>
      {state !== "pending" && (
        <Button className={styles.close} onClick={handleClose}>
          <CloseIcon />
        </Button>)}
      <h4 className={`${styles.title} ${styles[state]}`}>{stateTitle[state]}</h4>
      <p className={styles.content}>{content}</p>
    </div>
  )
}
