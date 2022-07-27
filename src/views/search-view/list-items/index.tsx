import { AudioPlayerSong, Track } from '../../../types'
import { DownloadIcon, PauseIcon, PlayIcon } from '../../../Icons'
import ImageFallback from '../../../assets/albumcover-fallback.jpg'
import Image from '../../../components/image'

import styles from './styles.module.css'
import { Dispatch, SetStateAction } from 'react'

interface ListItemsProps {
  items: Array<Track>
  hidden: boolean
  idActiveSong: string | undefined
  isPlayingSong: boolean
  onSetSong: Dispatch<SetStateAction<AudioPlayerSong | null>>
  togglePlaySong: Dispatch<SetStateAction<boolean>>
  createNewDownload: (value: Track) => void
}

const ListItems = ({ items, hidden, idActiveSong, isPlayingSong, onSetSong, togglePlaySong, createNewDownload } : ListItemsProps) => {
  function handleToggle (song: AudioPlayerSong) {
    idActiveSong === song.id
      ? togglePlaySong(prev => !prev)
      : onSetSong(song)
  }

  function renderPlayOrPauseIcon (id: string) {
    if (!idActiveSong || idActiveSong !== id) return <PlayIcon />
    return isPlayingSong ? <PauseIcon /> : <PlayIcon />
  }

  return (
    <ul className={styles.list} style={{ display: hidden ? 'none' : undefined }}>
      {items.map((track, index) => (
        <li key={track.id} className={styles.item}>
          <div className={styles.info}>
            <span className={styles.index}>{`${index + 1}`.padStart(2, '0')}</span>
            <button className={styles.albumCover} onClick={() => handleToggle(track)}>
              <Image src={track.albumCover} fallback={ImageFallback} alt={track.id}/>
              {renderPlayOrPauseIcon(track.id)}
            </button>
            <div className={styles.titleAndArtist}>
              <h4>{track.title}</h4>
              <p>{track.artist === '' ? 'sin-artista' : track.artist}</p>
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

export default ListItems
