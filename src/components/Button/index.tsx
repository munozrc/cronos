import { ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './styles.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'flat' | 'outline'
  icon?: ReactNode
}

export const Button = ({ variant = 'flat', children, icon = null, disabled, ...props }: ButtonProps) => {
  return (
    <button
      className={`${styles.btn} ${styles[variant]}`}
      disabled={disabled}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}
