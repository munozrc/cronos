import { useDownloadStore } from '../stores/useDownloadStore'
import styles from './DownloadsView.module.css'

const stateTransform = {
  completed: 'Completada',
  downloading: 'Descargando',
  error: 'Error'
}

const dateFormat = (date: Date) => new window.Intl.DateTimeFormat('es-CO', { dateStyle: 'long', timeStyle: 'medium' }).format(date)

export const DownloadsView = () => {
  const { itemList } = useDownloadStore()
  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h3 className={styles.title}>Mis Descargas</h3>
      </header>
      <table className={styles.downloadsTable}>
        <tr>
          <th>Canción</th>
          <th>Estado</th>
          <th>Fecha</th>
        </tr>
        {itemList.map(({ title, artists, state, date, id }) => (
          <tr key={date.getMilliseconds()}>
            <td>{`${artists.join(' & ')} - ${title}`}</td>
            <td className={`${styles.status} ${styles['status-' + state]}`}>{stateTransform[state]}</td>
            <td>{dateFormat(date)}</td>
          </tr>
        ))}
      </table>
    </section>
  )
}
