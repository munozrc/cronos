import { ReactNode } from 'react'
import { Track } from '../../../electron/types'
import { Button } from '../Button'

import styles from './styles.module.css'

interface ListOfItemsProps {
  children: ReactNode
}
interface ResultItemProps extends Track {
  handleDownload: () => void
  handlePlaySong: () => void
}

const ListOfItems = ({ children }: ListOfItemsProps) => (
  <ul className={styles.wrapperList}>
    {children}
  </ul>
)

const ResultItem = ({ albumCover, artist, title, album, ...props }: ResultItemProps) => (
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
      <Button variant='outline' onClick={props.handlePlaySong}>Reproducir</Button>
      <Button variant='outline' onClick={props.handleDownload}>Descargar</Button>
    </div>
  </li>
)

export { ResultItem }
export default ListOfItems
