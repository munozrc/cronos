import { useEffect, useState } from 'react'
import { DownloadFile, UpdateProgress } from '../../types'
import styles from './styles.module.css'

enum translateState {
  preparing = 'Preparando',
  completed = 'Completada',
  downloading = 'Descargando',
  error = 'Error'
}

enum colorState {
  preparing = 'none',
  completed = '#81A9FF',
  downloading = '#FFDD8D',
  error = '#FF5757'
}

const parseKbToMb = (value: number) => value > 0 ? (value / 1000).toFixed(2) : value

const Item = ({ uuid, artist, title, state, size, percent }: DownloadFile) => {
  const [progress, setProgress] = useState<UpdateProgress>({ percent, size })

  useEffect(() => {
    window.cronos.onUpdateProgress(setProgress, uuid)
  }, [uuid])

  return (
    <tr>
      <td className={styles.name}>{`${artist} - ${title}`}</td>
      <td className={styles.size}>{`${parseKbToMb(progress.size)} MB`}</td>
      <td className={styles.progress}>
        <div>
          <span style={{ width: state === 'error' ? '100%' : `${progress.percent}%`, backgroundColor: colorState[state] }}/>
        </div>
      </td>
      <td className={styles.status}>{translateState[state]}</td>
      <td className={styles.date}>Hoy</td>
    </tr>
  )
}

export default Item
