import { Track } from '../../../../electron/types'
import Image from '../../../components/image'
import ImageFallback from '../../../assets/albumcover-fallback.jpg'
import { DownloadIcon, PlayIcon } from '../../../components/Icons'

import styles from './styles.module.css'

interface ListItemsProps {
  items: Array<Track>
  createNewDownload: (value: Track) => void
}

export const ListItems = ({ items, createNewDownload } : ListItemsProps) => {
  return (
    <ul className={styles.list}>
      {items.map((track, index) => (
        <li key={track.id} className={styles.item}>
          <div className={styles.info}>
            <span className={styles.index}>{`${index + 1}`.padStart(2, '0')}</span>
            <div className={styles.albumCover}>
              <Image src={track.albumCover} fallback={ImageFallback} alt={track.id}/>
              <PlayIcon />
            </div>
            <div className={styles.titleAndArtist}>
              <h4>{track.title}</h4>
              <p>{track.artist}</p>
            </div>
          </div>
          <p className={styles.album}>{track.album}</p>
          <p className={styles.time}>{track.duration}</p>
          <button className={styles.btnDownload} onClick={() => createNewDownload(track)}>
            <DownloadIcon />
          </button>
        </li>
      ))}
    </ul>
  )
}
