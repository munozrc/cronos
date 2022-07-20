/* eslint-disable jsx-a11y/media-has-caption */

import { useEffect, useRef, useState } from 'react'
import Spinner from '../../../components/spinner'
import { PauseIcon, PlayIcon, VolumeIcon } from '../../../Icons'
import InfoSong from '../info-song'
import SeekSlider from './seek-slider'

import styles from './styles.module.css'

export interface AudioPlayerProps {
  id: string
  albumCover: string
  artist: string
  title: string
}

const AudioPlayer = ({ id, ...props }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [audioSrc, setAudioSrc] = useState('')
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const { getSongURL } = window.cronos
    if (id === '') return
    getSongURL(id).then(setAudioSrc)
    setCurrentTime(0)
    setDuration(0)
    setReady(false)
  }, [id])

  useEffect(() => {
    if (playing) audioRef.current?.play()
    else audioRef.current?.pause()
  }, [playing])

  function handleChangeSeek (value: number): void {
    if (!audioRef.current || !ready) return
    audioRef.current.currentTime = value
  }

  function handleCanPlay (): void {
    setDuration(audioRef.current?.duration || 0)
    setReady(true)
  }

  function togglePlay (): void {
    if (!ready) return
    setPlaying(prev => !prev)
  }

  return (
    <div className={styles.container}>
      <audio
        ref={audioRef}
        className={styles.audio}
        src={audioSrc}
        autoPlay={playing || undefined}
        controls={false}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onEnded={() => setPlaying(false)}
        onCanPlay={handleCanPlay}
      />
      <InfoSong {...props}/>
      <SeekSlider
        duration={duration}
        currentTime={currentTime}
        onChange={handleChangeSeek}
      />
      <div className={styles.groupButtons}>
        <button className={styles.btn} onClick={togglePlay}>
          {ready
            ? playing ? <PauseIcon width="26px" height="26px"/> : <PlayIcon width="26px" height="26px"/>
            : <Spinner width='26px' height='26px' borderWidth='3px' />
          }
        </button>
        <button className={styles.btn}>
          <VolumeIcon width="18px" height="18px"/>
        </button>
      </div>
    </div>
  )
}

export default AudioPlayer
