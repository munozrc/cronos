/* eslint-disable jsx-a11y/media-has-caption */

import { useEffect, useRef, useState } from 'react'
import { PauseIcon, PlayIcon, VolumeIcon } from '../../../Icons'
import InfoSong from '../info-song'
import SeekSlider from './seek-slider'

import styles from './styles.module.css'

interface AudioPlayerProps {
  id: string
  albumCover: string
  artist: string
  title: string
}

const AudioPlayer = ({ id, ...props }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setPlaying] = useState(false)
  const [audioSrc, setAudioSrc] = useState('')
  const [trackProgress, setTrackProgress] = useState(0)

  useEffect(() => {
    window.cronos.getSongURL(id).then(setAudioSrc)
  }, [id])

  useEffect(() => {
    if (!audioRef.current) return
    isPlaying ? audioRef.current.play() : audioRef.current.pause()
  }, [isPlaying])

  function handleChangeSeek (value: number) {
    if (!audioRef.current) return
    audioRef.current.currentTime = value
  }

  return (
    <div className={styles.container}>
      <audio
        ref={audioRef}
        className={styles.audio}
        src={audioSrc}
        onTimeUpdate={() => setTrackProgress(audioRef.current?.currentTime || 0)}
      />
      <InfoSong {...props}/>
      <SeekSlider
        duration={audioRef.current?.duration || 0}
        currentTime={trackProgress}
        onChange={handleChangeSeek}
      />
      <div className={styles.groupButtons}>
        <button className={styles.btn} onClick={() => setPlaying(prev => !prev)}>
          {isPlaying ? <PauseIcon width="26px" height="26px"/> : <PlayIcon width="26px" height="26px"/>}
        </button>
        <button className={styles.btn}>
          <VolumeIcon width="18px" height="18px"/>
        </button>
      </div>
    </div>
  )
}

export default AudioPlayer
