import ImageFallback from '../../../assets/albumcover-fallback.jpg'
import Image from '../../../components/image'
import styles from './styles.module.css'

interface InfoSongProps {
  title: string
  artist: string
  albumCover: string
}

const InfoSong = ({ title, artist, albumCover }: InfoSongProps) => (
  <div className={styles.container}>
    <figure className={styles.albumCover} key={albumCover}>
      <Image src={albumCover} fallback={ImageFallback} alt={albumCover}/>
    </figure>
    <div className={styles.titleAndArtist}>
      <h4>{title}</h4>
      <p>{artist}</p>
    </div>
  </div>
)

export default InfoSong
