import { useDownloadStore } from '../../stores/useDownloadStore'
import { DownloadIcon } from '../../components/Icons'
import { Hero, ViewContainer } from '../../layouts'

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
    <ViewContainer>
      <Hero
        icon={<DownloadIcon />}
        title="Descargas"
        subtitle={`${itemList.length} ${itemList.length === 1 ? 'Elemento' : 'Elementos'}`}
      />
      <table className={styles.downloadsTable}>
        <tr>
          <th>Canción</th>
          <th>Estado</th>
          <th>Fecha</th>
        </tr>
        {itemList.map(({ title, artist, state, date, uuid }) => (
          <tr key={uuid}>
            <td>{`${artist} - ${title}`}</td>
            <td className={`${styles.status} ${styles['status-' + state]}`}>{translateState[state]}</td>
            <td>{dateFormat(date)}</td>
          </tr>
        ))}
      </table>
    </ViewContainer>
  )
}
