/* eslint-disable jsx-a11y/media-has-caption */

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { PauseIcon, PlayIcon, VolumeIcon } from '../../../Icons'
import { AudioPlayerSong } from '../../../types'
import Spinner from '../../../components/spinner'
import InfoSong from '../info-song'
import SeekSlider from './seek-slider'

import styles from './styles.module.css'

export interface AudioPlayerProps {
  song: AudioPlayerSong
  playing: boolean
  onPlaying: Dispatch<SetStateAction<boolean>>
}

const AudioPlayer = ({ song, playing, onPlaying }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [source, setSource] = useState<string | undefined>(undefined)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    window.cronos.getSongURL(song.id).then(setSource)
    setCurrentTime(0)
    setDuration(0)
    setReady(false)
    onPlaying(false)
  }, [song, onPlaying])

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
    onPlaying(true)
  }

  function togglePlay (): void {
    if (!ready) return
    onPlaying(prev => !prev)
  }

  return (
    <div className={styles.container}>
      <audio
        ref={audioRef}
        className={styles.audio}
        src={source}
        autoPlay={playing || undefined}
        controls={false}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onEnded={() => onPlaying(false)}
        onCanPlay={handleCanPlay}
      />
      <InfoSong {...song}/>
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
