import { ButtonHTMLAttributes } from 'react'

import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'flat'
}

export const Button = ({ variant = 'flat', children, disabled, ...props }: ButtonProps) => {
  return (
    <button
      className={`${styles.btn} ${styles[variant]}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
