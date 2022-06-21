import { ReactNode, useState } from 'react'
import styles from './styles.module.css'

interface TabContainerProps {
  children: Array<ReactNode>
}

const isVisible = (value: number, id: number) => styles[value === id ? 'active' : 'disable']

export const TabContainer = ({ children }: TabContainerProps) => {
  const [showTab, toggleShowTab] = useState<number>(0)
  return (
    <section className={styles.wrapper}>
      <header className={styles.wrapperTabs}>
        <button className={isVisible(showTab, 0)} onClick={() => toggleShowTab(0)}>
          Resultados
        </button>
        <button className={isVisible(showTab, 1)} onClick={() => toggleShowTab(1)}>
          Sugerencias
        </button>
      </header>
      {children.filter((_child, index) => index === showTab)}
    </section>
  )
}
