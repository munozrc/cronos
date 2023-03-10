import { type FC } from "react"
import { Button, type ButtonProps } from "@/components/Button"
import styles from "./FrameButton.module.css"

interface Props extends Pick<ButtonProps, "children"> {
  variant: "primary" | "secondary"
  onAction: () => void
}

export const FrameButton: FC<Props> = ({ children, variant, onAction }) => (
  <Button
    className={`${styles.button} ${styles[variant]}`}
    onClick={onAction}
  >
    {children}
  </Button>
)
