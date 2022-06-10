import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Spinner } from '../components/Spinner'
import { useStore } from '../store'

import styles from './SearchView.module.css'

interface State {
  isLoading: boolean,
  isError: boolean
}

export const SearchView = () => {
  const { searchTrack, downloadTrack } = window.cronos
  const { results, setResults } = useStore()
  const [state, setState] = useState<State>({ isLoading: false, isError: false })
  const [searchParams] = useSearchParams()

  const query = searchParams.get('query')

  useEffect(() => {
    if (query === null) return
    setState({ isLoading: true, isError: false })
    searchTrack(query)
      .then((response) => {
        setState({ isLoading: false, isError: false })
        setResults(response)
      })
      .catch((response) => {
        setState({ isLoading: false, isError: true })
        setResults(response)
      })
  }, [query])

  if (state.isLoading) return <Spinner />

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
