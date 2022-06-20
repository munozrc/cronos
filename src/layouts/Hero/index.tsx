import { ReactNode } from 'react'

import styles from './styles.module.css'

interface HeroProps {
  icon: ReactNode
  subtitle?: string
}

export const Hero = ({ icon, subtitle }: HeroProps) => {
  return (
    <header className={styles.wrapperHeader}>
      <span className={styles.wrapperIcon}>{icon}</span>
      <section>
        <h3 className={styles.title}>Descargas</h3>
        <p className={styles.subtitle}>{subtitle}</p>
      </section>
    </header>
  )
}
