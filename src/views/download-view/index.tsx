import { FolderIcon } from '../../Icons'
import { Container } from '../../layouts'
import { useDownloadStore } from '../../stores/useDownloadStore'
import Item from './item'

import styles from './styles.module.css'

const numberOfElements = (items: number) => items === 1 ? `${items} elemento` : `${items} elementos`

export const DownloadView = () => {
  const { itemList } = useDownloadStore()

  return (
    <Container>
      <header className={styles.header}>
        <span className={styles.counterElements}>{numberOfElements(itemList.length)}</span>
        <button className={styles.btnFolder} onClick={window.cronos.openDownloadsFolder}>
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
          {itemList.map((item) => <Item key={item.uuid} {...item} />)}
        </tbody>
      </table>
    </Container>
  )
}
