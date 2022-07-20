import styles from './styles.module.css'

interface SpinnerProps {
  width: string
  height: string
  borderWidth: string
}

export default function Spinner (props: SpinnerProps) {
  return (
    <div
      role="presentation"
      className={styles.spinner}
      style={{ ...props }}
    />
  )
}
