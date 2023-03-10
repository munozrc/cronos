import type { FC, ReactNode, HTMLAttributes } from "react"
import styles from "./ViewContainer.module.css"

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export const ViewContainer: FC<Props> = ({ children, className, ...restOfProps }) => (
  <main
    className={`${styles.container} ${className ?? ""}`}
    {...restOfProps}
  >
    {children}
  </main>
)
