import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Track } from '../../app/types'

import styles from './SearchView.module.css'

export const SearchView = () => {
  const [results, setResults] = useState<Track[]>([])
  const [searchParams] = useSearchParams()

  const query = searchParams.get('query')
  const { searchTrack, downloadTrack } = window.cronos

  useEffect(() => {
    query && searchTrack(query)
      .then(setResults)
      .catch(setResults)
  }, [query])

  return (
    <section className={styles.wrapper}>
      <ul className={styles.list}>
        {results.map((song) => (
          <li key={song.id} className={styles.item}>
            <img className={styles.albumCover} src={song.albumCover} />
            <div className={styles.info}>
              <h4 className={styles.titleSong}>{song.title}</h4>
              <div className={styles.subInfo}>
                <p className={styles.artistSong}>{song.artists}</p>
                <p className={styles.albumSong}>{song.album}</p>
              </div>
            </div>
            <div className={styles.options}>
              <button className={styles.button}>Reproducir</button>
              <button className={styles.button} onClick={() => downloadTrack(song)}>
                Descargar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
