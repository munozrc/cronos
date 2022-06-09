import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Song } from '../../app/types'

import styles from './SearchView.module.css'

export const SearchView = () => {
  const [results, setResults] = useState<Array<Song>>([])
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const query = searchParams.get('query') ?? ''
    if (query === '') return
    window.cronos.searchSong(query)
      .then(setResults)
      .catch(setResults)
  }, [searchParams])

  const handleDownloadSong = (song: Song) => {
    const { downloadSong } = window.cronos
    const { duration, ...metadata } = song
    downloadSong(metadata)
  }

  return (
    <section className={styles.wrapper}>
      <ul className={styles.list}>
        {results.map((song) => (
          <li key={song.id} className={styles.item}>
            <img className={styles.albumCover} src={typeof song.albumCover === 'string' ? song.albumCover : undefined} />
            <div className={styles.info}>
              <h4 className={styles.titleSong}>{song.title}</h4>
              <div className={styles.subInfo}>
                <p className={styles.artistSong}>{song.artists}</p>
                <p className={styles.albumSong}>{song.album}</p>
              </div>
            </div>
            <div className={styles.options}>
              <button className={styles.button}>Reproducir</button>
              <button className={styles.button} onClick={() => handleDownloadSong(song)}>Descargar</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
