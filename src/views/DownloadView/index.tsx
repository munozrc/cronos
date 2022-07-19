import { Container } from '../../layouts'
import { useDownloadStore } from '../../stores/useDownloadStore'

import styles from './styles.module.css'

enum translateState {
  completed = 'Completada',
  downloading = 'Descargando',
  error = 'Error'
}

const dateFormat = (date: Date) => new window.Intl.DateTimeFormat('es-CO', { dateStyle: 'long', timeStyle: 'medium' }).format(date)

export const DownloadView = () => {
  const { itemList } = useDownloadStore()
  return (
    <Container>
      <table className={styles.downloadsTable}>
        <thead>
          <tr>
            <th>Canción</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map(({ title, artist, state, date, uuid }) => (
            <tr key={uuid}>
              <td>{`${artist} - ${title}`}</td>
              <td className={`${styles.status} ${styles['status-' + state]}`}>{translateState[state]}</td>
              <td>{dateFormat(date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}
