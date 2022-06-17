import { useSearchSong } from '../hooks/useSearchSong'
import { useDownloadStore } from '../stores/useDownloadStore'
import { ViewContainer } from '../layouts'
import { Spinner } from '../components/Spinner'

import styles from './SearchView.module.css'

export const SearchView = () => {
  const { queryResults, queryStatus } = useSearchSong()
  const { createNewDownload } = useDownloadStore()

  if (queryStatus === 'loading') return <Spinner />
  if (queryStatus === 'error') return <h3>Algo salio mal!</h3>

  return (
    <ViewContainer>
      <ul className={styles.list}>
        {queryResults.map((song) => (
          <li key={song.id} className={styles.item}>
            <picture className={styles.albumCover}>
              <img src={song.albumCover} loading="lazy" />
            </picture>
            <div className={styles.info}>
              <h4 className={styles.titleSong}>{song.title}</h4>
              <div className={styles.subInfo}>
                <p className={styles.artistSong}>{song.artist}</p>
                <p className={styles.albumSong}>{song.album}</p>
              </div>
            </div>
            <div className={styles.options}>
              <button className={styles.button}>Reproducir</button>
              <button className={styles.button} onClick={() => createNewDownload(song)}>
                Descargar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </ViewContainer>
  )
}
