import type { ReactNode, FC } from "react"
import type { Song, Video } from "@cronos/types"
import { Button, EditIcon, Input } from "@/components"

import styles from "./RadioButton.module.css"

interface Props {
  value: string
  children: ReactNode
  checked?: boolean
}

export const RadioButton: FC<Props> = ({ value, checked, children }) => {
  return (
    <label className={styles.container}>
      <Input
        type="radio"
        name="song"
        value={value}
        defaultChecked={checked}
        className={styles.input}
      />
      { children }
    </label>
  )
}

export const SongRadioButton: FC<Song> = (props) => (
  <RadioButton value={props.id}>
    <header className={styles.header}>
      <img
        className={styles.thumbnail}
        src={props.thumbnailUrl}
        referrerPolicy="no-referrer"
      />
      <div className={styles.titleAndArtists}>
        <h4>{props.title}</h4>
        <span>{props.artists[0].name}</span>
      </div>
    </header>
    <div className={styles.album}>
      <span>{props.album}</span>
    </div>
    <div className={styles.duration}>
      <span>{props.duration}</span>
    </div>
  </RadioButton>
)

export const VideoRadioButton: FC<Video> = (props) => (
  <RadioButton value={props.id} checked>
    <header className={styles.header}>
      <Button
        className={styles.editButton}
        onClick={() => { console.log("Click!") }}
      >
        <EditIcon />
      </Button>
      <div className={styles.titleAndArtists}>
        <h4>{props.title}</h4>
        <span>{props.channelTitle}</span>
      </div>
    </header>
    <div className={styles.sourceLink}>
      <span>Fuente: YouTube</span>
    </div>
  </RadioButton>
)
