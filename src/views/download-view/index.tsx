import { FolderIcon } from '../../Icons'
import { Container } from '../../layouts'
import { useDownloadStore } from '../../stores/useDownloadStore'

import styles from './styles.module.css'

// downloading = #FCE38A
// completed = #3A79FF
// error = #EB4747

enum translateState {
  preparing = 'Preparando',
  completed = 'Completada',
  downloading = 'Descargando',
  error = 'Error'
}

enum colorState {
  preparing = 'none',
  completed = '#81A9FF',
  downloading = '#FFDD8D',
  error = '#FF5757'
}

const numberOfElements = (items: number) => items === 1 ? `${items} elemento` : `${items} elementos`
const parseKbToMb = (value: number) => value > 0 ? (value / 1000).toFixed(2) : value

export const DownloadView = () => {
  const { itemList } = useDownloadStore()
  return (
    <Container>
      <header className={styles.header}>
        <span className={styles.counterElements}>{numberOfElements(itemList.length)}</span>
        <button className={styles.btnFolder}>
          <FolderIcon />
        </button>
      </header>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tamaño</th>
            <th>Progreso</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map(({ title, artist, state, uuid, size }) => (
            <tr key={uuid}>
              <td className={styles.name}>{`${artist} - ${title}`}</td>
              <td className={styles.size}>{`${parseKbToMb(size)} MB`}</td>
              <td className={styles.progress}>
                <div><span style={{ width: '100%', backgroundColor: colorState[state] }}/></div>
              </td>
              <td className={styles.status}>{translateState[state]}</td>
              <td className={styles.date}>Hoy</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}
