import styles from './styles.module.css'

export const Toolbar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <h1 className={styles.title}>CRONOS</h1>
      </div>
      <ul>
        <li>Buscar</li>
        <li>Descargas</li>
      </ul>
    </header>
  )
}
