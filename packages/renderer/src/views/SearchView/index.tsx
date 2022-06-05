import { SyntheticEvent, useState } from 'react'

import styles from './styles.module.css'

export const SearchView = () => {
  const [results, setResults] = useState([])

  const handleSearchSong = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      query: {value: string}
    }

    if (formElements.query.value.trim() === '') return

    const songs = await window.cronos.searchSong(formElements.query.value)
    setResults(songs as any)
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
            <img className={styles.albumCover} src={albumCover} />
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
