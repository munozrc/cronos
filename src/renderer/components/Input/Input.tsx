import type { FC, InputHTMLAttributes } from "react"
import styles from "./Input.module.css"

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input: FC<InputProps> = ({ children, className, ...restOfProps }) => (
  <input
    className={`${styles.input} ${className ?? ""}`}
    {...restOfProps}
  />
)
