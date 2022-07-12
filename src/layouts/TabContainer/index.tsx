import { ReactNode, useState } from 'react'
import styles from './styles.module.css'

interface TabContainerProps {
  children: Array<ReactNode>,
  callback?: (index: number) => void
}

const isVisible = (value: number, index: number) => styles[value === index ? 'active' : 'disable']

export const TabContainer = ({ children, callback }: TabContainerProps) => {
  const [showTab, toggleShowTab] = useState<number>(0)

  const handleClick = (index: number) => {
    toggleShowTab(index)
    callback && callback(index)
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.wrapperTabs}>
        <button className={isVisible(showTab, 0)} onClick={() => handleClick(0)}>
          Resultados
        </button>
        <button className={isVisible(showTab, 1)} onClick={() => handleClick(1)}>
          Sugerencias
        </button>
      </header>
      {children.filter((_child, index) => index === showTab)}
    </div>
  )
}
