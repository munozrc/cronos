import { SyntheticEvent, useState } from 'react'

import { Song } from '../../../../../typings'

import styles from './styles.module.css'

export const SearchView = () => {
  const [results, setResults] = useState<Array<Song>>([])

  const handleSearchSong = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { searchSong } = window.cronos
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      query: {value: string}
    }

    const query = formElements.query.value
    if (query.trim() === '') return

    searchSong(query)
      .then(setResults)
  }
  return (
    <section className={styles.wrapper}>
      <form onSubmit={handleSearchSong}>
        <input type="text" name="query" placeholder="Escribe el nombre de la cancion..." />
        <button>Buscar</button>
      </form>
      <ul className={styles.list}>
        {results.map(({ id, title, artists, album, albumCover }) => (
          <li key={id} className={styles.item}>
            <img className={styles.albumCover} src={typeof albumCover === 'string' ? albumCover : undefined} />
            <div className={styles.info}>
              <h4 className={styles.titleSong}>{title}</h4>
              <div className={styles.subInfo}>
                <p className={styles.artistSong}>{artists}</p>
                <p className={styles.albumSong}>{album}</p>
              </div>
            </div>
            <div className={styles.options}>
              <button className={styles.button}>Reproducir</button>
              <button className={styles.button}>Descargar</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
