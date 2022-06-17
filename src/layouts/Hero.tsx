import { ReactNode } from 'react'
import styles from './Hero.module.css'

interface HeroProps {
  icon: ReactNode
  subtitle: string
}

export const Hero = ({ icon, subtitle }: HeroProps) => {
  return (
    <header className={styles.header}>
      <span className={styles.circle}>
        {icon}
      </span>
      <section>
        <h3 className={styles.title}>Descargas</h3>
        <p className={styles.subtitle}>{subtitle}</p>
      </section>
    </header>
  )
}
