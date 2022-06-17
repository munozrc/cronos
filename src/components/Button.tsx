import { ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'flat'
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
