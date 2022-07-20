import styles from './styles.module.css'

interface ToogleFieldProps {
  checked: boolean
  onChange: (value: boolean) => void
}

const ToogleField = ({ checked, onChange }: ToogleFieldProps) => {
  return (
    <label className={styles.container}>
      RESULTADOS
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <div className={styles.wrapper}>
        <span className={checked ? styles.active : styles.disable}>Todos</span>
        <span className={checked ? styles.disable : styles.active}>Relacionados</span>
      </div>
    </label>
  )
}

export default ToogleField
