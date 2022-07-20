import { MouseEvent, useRef } from 'react'
import styles from './styles.module.css'

function parseTime (value: number): string {
  return String(value).padStart(2, '0')
}

function secondsToTime (time: number): string {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time - (hours * 3600)) / 60)
  const seconds = Math.floor(time) - (hours * 3600) - (minutes * 60)

  if (hours === 0) return `${minutes}:${parseTime(seconds % 60)}`
  return `${parseTime(hours)}:${parseTime(minutes)}:${parseTime(seconds % 60)}`
}

function getProgressInPixels (currentTime: number, duration: number): { width: string} {
  const progress = (currentTime / duration) * 100
  return { width: isNaN(progress) ? '0%' : `${progress}%` }
}

interface SeekSliderProps {
  currentTime: number,
  duration: number,
  onChange: (value: number) => void
}

const SeekSlider = ({ currentTime, duration, onChange }: SeekSliderProps) => {
  const seekRef = useRef<HTMLDivElement>(null)

  const handleOnMouse = (e: MouseEvent<HTMLDivElement>) => {
    if (seekRef.current === null) return
    const timelineWidth = window.getComputedStyle(seekRef.current).width
    const normalizePageX = e.pageX - seekRef.current.getBoundingClientRect().left
    const timeToSeek = Math.floor(normalizePageX / parseInt(timelineWidth, 10) * duration)
    timeToSeek >= 0 && timeToSeek <= duration && onChange(Math.floor(timeToSeek))
  }

  return (
    <div className={styles.containerSeek}>
      <span className={styles.time}>{secondsToTime(currentTime)}</span>
      <div
        ref={seekRef}
        className={styles.seek}
        onClick={handleOnMouse}
        role="slider"
        aria-valuenow={currentTime}
        onKeyUp={() => {}}
        tabIndex={0}
      >
        <div className={styles.track} style={getProgressInPixels(currentTime, duration)} />
      </div>
      <span className={styles.time}>{secondsToTime(duration)}</span>
    </div>
  )
}

export default SeekSlider
