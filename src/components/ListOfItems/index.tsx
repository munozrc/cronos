import { Track } from '../../../electron/types'
import { Button } from '../Button'

import styles from './styles.module.css'

interface ListOfItemsProps {
  list: Array<Track>
  isVisible: boolean
  createNewDownload: (value: Track) => void
}
interface ResultItemProps extends Track {
  handleDownload: () => void
  handlePlaySong: () => void
}

const ListOfItems = ({ list, isVisible, createNewDownload }: ListOfItemsProps) => (
  <ul className={styles.wrapperList}>
    {isVisible && list.map((item) => (
      <ResultItem
        key={item.id}
        {...item}
        handleDownload={() => createNewDownload(item)}
        handlePlaySong={() => {}}
      />
    ))}
  </ul>
)

const ResultItem = ({ albumCover, artist, title, album, ...props }: ResultItemProps) => (
  <li className={styles.wrapperResultItem}>
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

export { ListOfItems }
