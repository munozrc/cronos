import { ReactNode } from 'react'

import styles from './styles.module.css'

interface ContentProps {
  isLoading: boolean
  isError: boolean
  children: ReactNode | Array<ReactNode>
}

export const Content = ({ isLoading, isError, children }: ContentProps) => {
  return (
    <div className={styles.container}>
      <div className={`${isLoading ? styles.wrapperSpinner : styles.hidden}`}>
        <div className={styles.spinner} />
      </div>
      <div className={`${!isLoading && !isError ? styles.active : styles.hidden}`}>{children}</div>
    </div>
  )
}
