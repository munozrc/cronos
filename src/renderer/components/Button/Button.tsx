import { type ReactNode, type FC, type ButtonHTMLAttributes } from "react"
import styles from "./Button.module.css"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
}

export const Button: FC<ButtonProps> = ({ children, className, ...restOfProps }) => (
  <button
    type="button"
    className={`${styles.button} ${className ?? ""}`}
    {...restOfProps}
  >
    {children}
  </button>
)
