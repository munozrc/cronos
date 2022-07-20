import { useState } from 'react'
import { PauseIcon, PlayIcon, VolumeIcon } from '../../../components/Icons'
import InfoSong from '../info-song'
import SeekSlider from './seek-slider'

import styles from './styles.module.css'

const MusicPlayer = () => {
  const [state, setState] = useState({ currentTime: 1, duration: 67, isPlaying: true })
  return (
    <div className={styles.container}>
      <InfoSong
        albumCover='Afters Hours'
        artist='The Weeknd'
        title='Save Your Tears Save'
      />
      <SeekSlider
        duration={state.duration}
        currentTime={state.currentTime}
        onChange={(value) => setState(prev => ({ ...prev, currentTime: value }))}
      />
      <div className={styles.groupButtons}>
        <button className={styles.btn} onClick={() => setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))}>
          {state.isPlaying ? <PauseIcon width="26px" height="26px"/> : <PlayIcon width="26px" height="26px"/>}
        </button>
        <button className={styles.btn}>
          <VolumeIcon width="18px" height="18px"/>
        </button>
      </div>
    </div>
  )
}

export default MusicPlayer
