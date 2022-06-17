import { ReactNode } from 'react'
import styles from './ViewContainer.module.css'

interface ViewContainerProps {
  children: ReactNode
}

export const ViewContainer = ({ children }: ViewContainerProps) => (
  <section className={styles.wrapper}>
    {children}
  </section>
)
