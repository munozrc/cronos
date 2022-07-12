import { ReactNode } from 'react'

import styles from './styles.module.css'

interface ViewContainerProps {
  children: ReactNode
}

export const ViewContainer = ({ children }: ViewContainerProps) => (
  <div className={styles.wrapper}>
    {children}
  </div>
)
