import { ReactNode } from 'react'

import styles from './styles.module.css'

interface HeroProps {
  icon: ReactNode
  title: string
  subtitle: string
}

export const Hero = ({ icon, title, subtitle }: HeroProps) => {
  return (
    <header className={styles.wrapperHeader}>
      <span className={styles.wrapperIcon}>{icon}</span>
      <section>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
      </section>
    </header>
  )
}
