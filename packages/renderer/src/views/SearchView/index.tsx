import styles from './styles.module.css'

const songData = {
  title: 'Out of Time',
  artist: 'The Weeknd',
  album: 'Dawn FM',
  albumCover: 'https://lh3.googleusercontent.com/5teqUPmWiFmagN0RggBKRXSW1zUj5_fVCEhbVhN6qt519EyHj6njy1x8dnJcRWNhQ5cl4dZgGaxbyqgv=w280-h280-l90-rj'
}

export const SearchView = () => {
  return (
    <section className={styles.wrapper}>
      <ul className={styles.list}>
        {[0, 1, 2].map((value) => (
          <li key={value} className={styles.item}>
            <img className={styles.albumCover} src={songData.albumCover} />
            <div className={styles.info}>
              <h4 className={styles.titleSong}>{songData.title}</h4>
              <div className={styles.subInfo}>
                <p className={styles.artistSong}>{songData.artist}</p>
                <p className={styles.albumSong}>{songData.album}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
