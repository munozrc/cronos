import { ReactNode } from 'react'
import { useDownloadStore } from '../../stores/useDownloadStore'
import { Track } from '../../../electron/types'
import { Button } from '../Button'

import styles from './styles.module.css'

interface ListOfItemsProps { children: ReactNode }
interface ResultItemProps extends Track {}

const ListOfItems = ({ children }: ListOfItemsProps) => {
  return (
    <ul className={styles.wrapperList}>
      {children}
    </ul>
  )
}

const ResultItem = (props: ResultItemProps) => {
  const { albumCover, artist, title, album } = props
  const { createNewDownload } = useDownloadStore()

  // Handling functions
  const handleDownload = () => createNewDownload(props)
  const handlePlaySong = () => {}

  return (
    <li className={styles.wrapperItem}>
      <picture className={styles.albumCover}>
        <img src={albumCover} loading="lazy" alt={artist}/>
      </picture>
      <div className={styles.wrapperInfo}>
        <h4 className={styles.titleSong}>{title}</h4>
        <div className={styles.wrapperSubtitle}>
          <p className={styles.artistSong}>{artist}</p>
          <p className={styles.albumSong}>{album}</p>
        </div>
      </div>
      <div className={styles.wrapperOptions}>
        <Button variant='outline' onClick={handlePlaySong}>Reproducir</Button>
        <Button variant='outline' onClick={handleDownload}>Descargar</Button>
      </div>
    </li>
  )
}

export { ResultItem }
export default ListOfItems
